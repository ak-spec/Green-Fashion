const {OpenAI } = require("openai");
require("dotenv").config();
const {StatusCodes} = require("http-status-codes");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const getResponse = async (req, res) => {
    const prompt = req.query.prompt;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            content: "You are a humble assistant who can answer questions only about sustainable fashion or recycling clothes.Your answers must be in point form."
          },
          {
            "role": "user",
            "content": `${prompt}`
          }
        ],
        temperature: 1,
        max_tokens: 256,
        frequency_penalty: 0,
      });
      const msg = response.choices[0].message.content;
      res.status(StatusCodes.OK).json({response: msg})
      
}

module.exports = getResponse;