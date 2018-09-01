var parseString = require("xml2js").parseString;
const axios = require("axios");

async function getXml() {
  const result = await axios({
    method: "get",
    url: "https://s3-eu-west-1.amazonaws.com/simplexmldata/data.xml",
    responseType: "text"
  })
    .then(function(response) {
      return new Promise((resolve, reject) => {
        parseString(response.data, function(err, result) {
          console.dir(result.BACSDocument.Data);
          resolve(result.BACSDocument.Data);
        });
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
  console.log("returns here", result);
  return result;
}

module.exports = getXml;
