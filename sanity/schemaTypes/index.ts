import {course} from "./course";
import {homeSettings} from "./homeSettings";
import {news} from "./news";
import {siteSettings} from "./siteSettings";

export const schema = {
  types: [
    siteSettings,
    homeSettings,
    news,
    course,
  ],
};