import Imagekit from "@imagekit/nodejs"
const imagekit=new Imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATEKEY
});
export default imagekit;