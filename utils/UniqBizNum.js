import Card from "../model/mongodb/cards/Card.js";

const UniqBizNum = async (bizNumber) => {
    let cardbiznumber = await Card.findOne({ bizNumber })

    return cardbiznumber
};

export default UniqBizNum;