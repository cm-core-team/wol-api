import axios from "axios";
import { parse } from "node-html-parser";
const getHTML = async (url) => {
    const response = await axios.get(url);
    const html = parse(response.data);
    return html;
};
export default getHTML;
