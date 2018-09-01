const axios = require("axios");


async function getXmlmanually() {
    const result = await axios({
        method: "get",
        url: "https://s3-eu-west-1.amazonaws.com/simplexmldata/data.xml",
        responseType: "text"
    });

    return result;
}

// getXmlmanually().then(data => {
//     console.log(data);
// });



const xml = "<a><b>crap</b></a>"

console.log(xml.indexOf('>'))



module.exports = {};

/*

const mockXml = "

<A atr1='11' atr2='22'>
    <B></B>
    <C></C>
</A>

"


*/