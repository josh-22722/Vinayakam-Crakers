import sparklerImg from './category_sparklers_diyas_1790418876586.jpg';
import aerialImg from './category_aerial_shots_1790418856020.jpg';
import giftBoxImg from './category_gift_boxes_1790418843801.jpg';
import heroImg from './hero_fireworks_diwali_1790418829840.jpg';
import workshopImg from './mfg_process_workshop_1790419865818.jpg';
import testingImg from './mfg_sparkler_testing_1790419883704.jpg';

// 1. Sparklers (10cm, 12cm, 15cm, 30cm)
import sparklerCompositeImg from './sparkler_composite_1790532985311.jpg';
import sparklerBoxImg from './sparkler_box_1790533001749.jpg';
import sparklerSticksImg from './sparkler_sticks_1790533014534.jpg';
import sparklerLitImg from './sparkler_lit_1790533031620.jpg';

// 2. Ground Chakkars & Spinners
import groundChakkarImg from './prod_ground_chakkar_1790533741119.jpg';
import chakkarBoxImg from './chakkar_box_1790534513785.jpg';
import chakkarDiscsImg from './chakkar_discs_1790534527545.jpg';
import chakkarSpinImg from './chakkar_spin_1790534539479.jpg';

// 3. Flower Pots & Anars
import flowerPotsImg from './prod_flower_pots_1790533751965.jpg';
import flowerpotBoxImg from './flowerpot_box_1790534551742.jpg';
import flowerpotConesImg from './flowerpot_cones_1790534563838.jpg';
import flowerpotBurstImg from './flowerpot_burst_1790534576187.jpg';

// 4. Bombs & Sound Shells
import bombsImg from './prod_bombs_1790533794350.jpg';
import bombBoxImg from './bomb_box_1790534589619.jpg';
import bombTwineImg from './bomb_twine_1790534601389.jpg';
import bombBlastImg from './bomb_blast_1790534615334.jpg';

// 5. Rockets
import rocketsImg from './prod_rockets_1790533781466.jpg';
import rocketBoxImg from './rocket_box_1790534629267.jpg';
import rocketSticksImg from './rocket_sticks_1790534640234.jpg';
import rocketLaunchImg from './rocket_launch_1790534651264.jpg';

// 6. Wala & Garlands
import garlandsImg from './prod_garlands_1790533810000.jpg';
import garlandBoxImg from './garland_box_1790534664594.jpg';
import garlandStripImg from './garland_strip_1790534676923.jpg';
import garlandBurstImg from './garland_burst_1790534688201.jpg';

// 7. Aerial Sky Shots & Repeaters
import aerialShotsImg from './prod_aerial_shots_1790533765918.jpg';
import aerialCakeBoxImg from './aerial_cake_box_1790534700373.jpg';
import aerialTubesImg from './aerial_tubes_1790534712510.jpg';
import aerialBurstImg from './aerial_burst_1790534724944.jpg';

// 8. Lakshmi Sound Crackers & Bijili
import lakshmiSoundImg from './prod_lakshmi_sound_1790533850731.jpg';
import lakshmiBoxImg from './lakshmi_box_1790534739510.jpg';
import lakshmiSinglesImg from './lakshmi_singles_1790534752413.jpg';
import lakshmiBurstImg from './lakshmi_burst_1790534764145.jpg';

// 9. Kids Novelties
import kidsNoveltyImg from './prod_kids_novelty_1790533838733.jpg';
import kidsPopsImg from './kids_pops_1790534775689.jpg';
import kidsSnakeImg from './kids_snake_1790534787857.jpg';
import kidsCapsImg from './kids_caps_1790534797575.jpg';

// 10. Shower Fountains & Twinkling Stars
import fountainsImg from './prod_fountains_1790533864088.jpg';
import fountainBoxImg from './fountain_box_1790534809473.jpg';
import fountainTubesImg from './fountain_tubes_1790534821941.jpg';
import fountainSprayImg from './fountain_spray_1790534834293.jpg';

// 11. Gift Boxes & Combos
import giftBoxesImg from './prod_gift_boxes_1790533823099.jpg';
import giftboxClosedImg from './giftbox_closed_1790534846900.jpg';
import giftboxDetailsImg from './giftbox_details_1790534858665.jpg';
import giftboxFamilyImg from './giftbox_family_1790534872105.jpg';

export const ASSET_IMAGES = {
  sparklers: sparklerImg,
  sparklerComposite: sparklerCompositeImg,
  sparklerBox: sparklerBoxImg,
  sparklerSticks: sparklerSticksImg,
  sparklerLit: sparklerLitImg,
  aerialShots: aerialImg,
  giftBoxes: giftBoxImg,
  hero: heroImg,
  workshop: workshopImg,
  testing: testingImg,
  
  // Custom Product Categories
  groundChakkar: groundChakkarImg,
  chakkarBox: chakkarBoxImg,
  chakkarDiscs: chakkarDiscsImg,
  chakkarSpin: chakkarSpinImg,

  flowerPots: flowerPotsImg,
  flowerpotBox: flowerpotBoxImg,
  flowerpotCones: flowerpotConesImg,
  flowerpotBurst: flowerpotBurstImg,

  bombs: bombsImg,
  bombBox: bombBoxImg,
  bombTwine: bombTwineImg,
  bombBlast: bombBlastImg,

  rockets: rocketsImg,
  rocketBox: rocketBoxImg,
  rocketSticks: rocketSticksImg,
  rocketLaunch: rocketLaunchImg,

  garlands: garlandsImg,
  garlandBox: garlandBoxImg,
  garlandStrip: garlandStripImg,
  garlandBurst: garlandBurstImg,

  aerialCakeShots: aerialShotsImg,
  aerialCakeBox: aerialCakeBoxImg,
  aerialTubes: aerialTubesImg,
  aerialBurst: aerialBurstImg,

  lakshmiSound: lakshmiSoundImg,
  lakshmiBox: lakshmiBoxImg,
  lakshmiSingles: lakshmiSinglesImg,
  lakshmiBurst: lakshmiBurstImg,

  kidsNovelty: kidsNoveltyImg,
  kidsPops: kidsPopsImg,
  kidsSnake: kidsSnakeImg,
  kidsCaps: kidsCapsImg,

  fountains: fountainsImg,
  fountainBox: fountainBoxImg,
  fountainTubes: fountainTubesImg,
  fountainSpray: fountainSprayImg,

  giftHamper: giftBoxesImg,
  giftboxClosed: giftboxClosedImg,
  giftboxDetails: giftboxDetailsImg,
  giftboxFamily: giftboxFamilyImg,
};

// Map each category to its custom studio image
export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'sparklers': sparklerCompositeImg,
  'ground-chakkars': groundChakkarImg,
  'flower-pots': flowerPotsImg,
  'fountains': fountainsImg,
  'aerial-sky-shot': aerialShotsImg,
  'multicolour-sky-shot': aerialShotsImg,
  'kids-crackers': kidsNoveltyImg,
  'rockets': rocketsImg,
  'bombs': bombsImg,
  'wala-garland': garlandsImg,
  'gift-box': giftBoxesImg,
  'one-sound-crackers': lakshmiSoundImg,
  'combo-pack': giftBoxesImg,
  'twinkling-star': fountainsImg,
  'bijili': lakshmiSoundImg,
  'whistling-items': rocketsImg,
  'paper-bomb': bombsImg,
  'brand-assortments': giftBoxesImg,
};
