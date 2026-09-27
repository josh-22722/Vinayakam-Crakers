import sparklerImg from './category_sparklers_diyas_1790418876586.jpg';
import aerialImg from './category_aerial_shots_1790418856020.jpg';
import giftBoxImg from './category_gift_boxes_1790418843801.jpg';
import heroImg from './hero_fireworks_diwali_1790418829840.jpg';
import workshopImg from './mfg_process_workshop_1790419865818.jpg';
import testingImg from './mfg_sparkler_testing_1790419883704.jpg';

export const ASSET_IMAGES = {
  sparklers: sparklerImg,
  aerialShots: aerialImg,
  giftBoxes: giftBoxImg,
  hero: heroImg,
  workshop: workshopImg,
  testing: testingImg,
};

// Map each category to its authentic image
export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'sparklers': sparklerImg,
  'flower-pots': sparklerImg,
  'ground-chakkars': sparklerImg,
  'fountains': sparklerImg,
  'aerial-sky-shot': aerialImg,
  'multicolour-sky-shot': aerialImg,
  'sound-crackers': aerialImg,
  'chorsa-crackers': aerialImg,
  'bijili-crackers': aerialImg,
  'bombs': aerialImg,
  'kids-crackers': sparklerImg,
  'rockets': aerialImg,
  'novelty-matches': sparklerImg,
  'gift-boxes': giftBoxImg,
  'single-sound': aerialImg,
};
