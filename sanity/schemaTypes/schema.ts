import {course} from "./course";
import {homeSettings} from "./homeSettings";
import {news} from "./news";
import {siteSettings} from "./siteSettings";
import {teacher} from "./teacher";
import {gallery} from "./gallery";

export const schema = {
  types: [
    siteSettings,
    homeSettings,
    news,
    course,
    teacher,
    gallery,
  ],
};