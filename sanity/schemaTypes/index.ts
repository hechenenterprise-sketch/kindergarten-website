import {contactSettings} from "./contactSettings";
import {course} from "./course";
import {gallery} from "./gallery";
import {homeSettings} from "./homeSettings";
import {news} from "./news";
import {siteSettings} from "./siteSettings";
import {teacher} from "./teacher";
import {aboutSettings} from "./aboutSettings";
import {brochure} from "./brochure";
import {siteViewCount} from "./siteViewCount";
import {featuredActivity} from "./featuredActivity";

export const schema = {
  types: [
    siteSettings,
    homeSettings,
    aboutSettings,
    contactSettings,
    news,
    course,
    featuredActivity,
    teacher,
    gallery,
    brochure,
    siteViewCount,
  ],
};
