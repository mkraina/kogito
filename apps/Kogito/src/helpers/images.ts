import BonusRelaxFireplace from '../assets/bonusRelaxation/fireplace.png';
import BonusRelaxMeadow from '../assets/bonusRelaxation/meadow.png';
import BonusRelaxMusicOfBreathingExercises from '../assets/bonusRelaxation/musicOfBreathingExercises.png';
import BonusRelaxMusicOfProgressiveMuscleRelaxation from '../assets/bonusRelaxation/musicOfProgressiveMuscleRelaxation.png';
import BonusRelaxNightNature from '../assets/bonusRelaxation/nightNature.png';
import BonusRelaxOcean from '../assets/bonusRelaxation/ocean.png';
import BonusRelaxRain from '../assets/bonusRelaxation/rain.png';
import BonusRelaxRelaxation from '../assets/bonusRelaxation/relaxation.png';
import BonusRelaxScanningOwnBody from '../assets/bonusRelaxation/scanningOwnBody.png';
import BonusRelaxStream from '../assets/bonusRelaxation/stream.png';
import BonusRelaxWoods from '../assets/bonusRelaxation/woods.png';
import BoxImg4 from '../assets/box-img-4.png';
import ImageRelaxFireplace from '../assets/images/fireplace.png';
import Image1 from '../assets/images/image_1.png';
import Image2 from '../assets/images/image_2.png';
import Image3 from '../assets/images/image_3.png';
import Image4 from '../assets/images/image_4.png';
import Image5 from '../assets/images/image_5.png';
import Image6 from '../assets/images/image_6.png';
import Image7 from '../assets/images/image_7.png';
import Image8 from '../assets/images/image_8.png';
import Image9 from '../assets/images/image_9.png';
import Image10 from '../assets/images/image_10.png';
import Image11 from '../assets/images/image_11.png';
import Image12 from '../assets/images/image_12.png';
import Image13 from '../assets/images/image_13.png';
import Image14 from '../assets/images/image_14.png';
import Image15 from '../assets/images/image_15.png';
import ImageRelaxMeadow from '../assets/images/meadow.png';
import ImageRelaxMusicOfBreathingExercises from '../assets/images/musicOfBreathingExercises.png';
import ImageRelaxMusicOfProgressiveMuscleRelaxation from '../assets/images/musicOfProgressiveMuscleRelaxation.png';
import ImageRelaxNightNature from '../assets/images/nightNature.png';
import ImageRelaxOcean from '../assets/images/ocean.png';
import ImageRelaxRain from '../assets/images/rain.png';
import ImageRelaxRelaxation from '../assets/images/relaxation.png';
import ImageRelaxScanningOwnBody from '../assets/images/scanningOwnBody.png';
import ImageRelaxStream from '../assets/images/stream.png';
import ImageRelaxWoods from '../assets/images/woods.png';

type Placing = 'bonusRelaxationOverview' | 'audioDetail';

// eslint-disable-next-line max-lines-per-function, complexity
export default (placing: Placing, image: string | null) => {
  if (placing === 'bonusRelaxationOverview') {
    switch (image) {
      case 'bonusRelaxation/rain':
        return BonusRelaxRain;
      case 'bonusRelaxation/fireplace':
        return BonusRelaxFireplace;
      case 'bonusRelaxation/woods':
        return BonusRelaxWoods;
      case 'bonusRelaxation/meadow':
        return BonusRelaxMeadow;
      case 'bonusRelaxation/nightNature':
        return BonusRelaxNightNature;
      case 'bonusRelaxation/ocean':
        return BonusRelaxOcean;
      case 'bonusRelaxation/stream':
        return BonusRelaxStream;
      case 'bonusRelaxation/musicOfBreathingExercises':
        return BonusRelaxMusicOfBreathingExercises;
      case 'bonusRelaxation/relaxation':
        return BonusRelaxRelaxation;
      case 'bonusRelaxation/musicOfProgressiveMuscleRelaxation':
        return BonusRelaxMusicOfProgressiveMuscleRelaxation;
      case 'bonusRelaxation/scanningOwnBody':
        return BonusRelaxScanningOwnBody;
      default:
        return BoxImg4;
    }
  }
  switch (image) {
    case 'images/image_1':
      return Image1;
    case 'images/image_2':
      return Image2;
    case 'images/image_3':
      return Image3;
    case 'images/image_4':
      return Image4;
    case 'images/image_5':
      return Image5;
    case 'images/image_6':
      return Image6;
    case 'images/image_7':
      return Image7;
    case 'images/image_8':
      return Image8;
    case 'images/image_9':
      return Image9;
    case 'images/image_10':
      return Image10;
    case 'images/image_11':
      return Image11;
    case 'images/image_12':
      return Image12;
    case 'images/image_13':
      return Image13;
    case 'images/image_14':
      return Image14;
    case 'images/image_15':
      return Image15;

    case 'bonusRelaxation/rain':
      return ImageRelaxRain;
    case 'bonusRelaxation/fireplace':
      return ImageRelaxFireplace;
    case 'bonusRelaxation/woods':
      return ImageRelaxWoods;
    case 'bonusRelaxation/meadow':
      return ImageRelaxMeadow;
    case 'bonusRelaxation/nightNature':
      return ImageRelaxNightNature;
    case 'bonusRelaxation/ocean':
      return ImageRelaxOcean;
    case 'bonusRelaxation/stream':
      return ImageRelaxStream;
    case 'bonusRelaxation/musicOfBreathingExercises':
      return ImageRelaxMusicOfBreathingExercises;
    case 'bonusRelaxation/relaxation':
      return ImageRelaxRelaxation;
    case 'bonusRelaxation/musicOfProgressiveMuscleRelaxation':
      return ImageRelaxMusicOfProgressiveMuscleRelaxation;
    case 'bonusRelaxation/scanningOwnBody':
      return ImageRelaxScanningOwnBody;

    default:
      return Image1;
  }
};
