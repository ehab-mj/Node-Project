import {
  createCard,
  deleteCard,
  getAllCards,
  getAllMyCards,
  getCardById,
  updateCard,
  updateLikeCard,
} from "../model/dbAdapter.js";
import handleError from "../utils/handleError.js";
import debug from "debug";

let log = debug("app:card.controller");

const getAllCardsController = async (req, res) => {
  try {
    let cards = await getAllCards();
    res.json(cards);
  } catch (err) {
    log(err);
  }
};

const getCardByIdController = async (req, res) => {
  try {
    let card = await getCardById(req.params.id);
    res.json(card);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const getMyCardsController = async (req, res) => {
  const userId = req.userData._id;
  try {
    let myCards = await getAllMyCards(userId);
    return res.json(myCards);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const createCardController = async (req, res) => {
  /**
   * user logged
   * user logged in as biz
   * joi on body
   */
  try {
    const userId = req.userData._id;
    req.body.user_id = userId;
    let newCard = await createCard(req.body);
    return res.json(newCard);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const updateCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    // console.log("cardFromDb", cardFromDb);
    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    if (req.userData.isBusiness && req.userData._id !== user_id) {
      throw new Error(
        "You are not allowed to update this card, you must be the owner of the card"
      );
    }
    const updatedCard = await updateCard(req.params.id, req.body);
    return res.json(updatedCard);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const patchLikeController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let likes = [...cardFromDb.likes];
    if (likes.includes(req.userData._id)) {
      likes = likes.filter((id) => id !== req.userData._id);
    } else {
      likes.push(req.userData._id);
    }
    const updatedCardFromDb = await updateLikeCard(req.params.id, likes);
    log("updatedCardFromDb", updatedCardFromDb);
    return res.json(updatedCardFromDb);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

//oran m, rawnak a, sara l
const patchBizNumberController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    //////
    let CardWithBizNumber = await UniqBizNum.findOne(
      req.body.bizNumber
    );
    if (
      CardWithBizNumber &&
      CardWithBizNumber._id !== req.params.id
    ) {
      throw new Error("bizNumber must be unique");
    }
    //////

    //check bizNumber, also check if unique
    cardFromDb.bizNumber = req.body.bizNumber;
    let updatedCard = await updateCard(req.params.id, cardFromDb);
    return res.json(updatedCard);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

//oran m, ilan v
const deleteCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (req.userData.isBusiness && req.userData._id !== user_id) {
      throw new Error(
        "You are not allowed to update this card, you must be the owner of the card"
      );
    }
    const cardAfterDeleteFromDb = await deleteCard(req.params.id);
    return res.json(cardAfterDeleteFromDb);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

export {
  getAllCardsController,
  getCardByIdController,
  getMyCardsController,
  createCardController,
  updateCardController,
  patchLikeController,
  patchBizNumberController,
  deleteCardController,
};