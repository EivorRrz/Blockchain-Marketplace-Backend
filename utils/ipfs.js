const { create } = require("ipfs-http-client");

// Using Infura’s IPFS API – adjust as needed
const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

exports.uploadToIPFS = async (data) => {
    //so this take data(music,text,images!)
    const { cid } = await client.add(data);//cid means unique Identifier!
    return cid.toString();//return the CID  LATER CAN BE access
}