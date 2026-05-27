export interface TranslationSet {
  navExperience: string;
  navCurriculum: string;
  navEligibility: string;
  navFaq: string;
  navAdmissionsDesk: string;
  navContactNumber: string;
  navBookTour: string;

  heroTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTourCta: string;
  heroExploreCta: string;
  heroLegacyLabel: string;
  heroLegacyDesc: string;

  statLegacyNum: string;
  statLegacyLabel: string;
  statCampusNum: string;
  statCampusLabel: string;
  statRatioNum: string;
  statRatioLabel: string;
  statLeadersNum: string;
  statLeadersLabel: string;

  aboutHeaderTag: string;
  aboutHeaderTitle: string;
  aboutDescription: string;

  whyChooseTitle: string;
  whyChooseSub: string;
  whyCards: {
    title: string;
    description: string;
  }[];

  flyersTag: string;
  flyersTitle: string;
  flyersSub: string;
  flyer1Title: string;
  flyer1Tag: string;
  flyer1Desc: string;
  flyer2Title: string;
  flyer2Tag: string;
  flyer2Desc: string;
  flyerPromoItem1: string;
  flyerPromoItem2: string;
  flyerPromoItem3: string;
  flyerPromoItem4: string;
  flyerCtaBtn: string;

  calculatorTitle: string;
  calculatorSub: string;
  calculatorLabelDob: string;
  calculatorBtnCheck: string;
  calculatorResultEligible: string;
  calculatorResultNotEligible: string;
  calculatorResultPreFillBtn: string;

  enquiryTitle: string;
  enquirySub: string;
}

export const TRANSLATIONS: Record<'en' | 'ta', TranslationSet> = {
  en: {
    navExperience: "The Sanctuary Experience",
    navCurriculum: "Curriculum Core",
    navEligibility: "Eligibility Check",
    navFaq: "FAQs",
    navAdmissionsDesk: "Admissions Desk",
    navContactNumber: "+91 4142 227 000",
    navBookTour: "Book Campus Tour",

    heroTagline: "Admissions Open for Academic Year 2026 - 2027",
    heroHeadline: "Where Learning Finds Space to Grow",
    heroSubheadline: "A premium 25-acre educational sanctuary in Cuddalore where freedom meets responsibility, and children blossom into confident, values-driven, and future-ready global leaders.",
    heroTourCta: "Book Campus Tour Slot",
    heroExploreCta: "Explore 25-Acre Sanctuary",
    heroLegacyLabel: "100% Verified Legacy",
    heroLegacyDesc: "No simulated AI people, stock images, or virtual mockups. Experience authentic excellence.",

    statLegacyNum: "30+ Yrs",
    statLegacyLabel: "Trusted Legacy",
    statCampusNum: "25 Acres",
    statCampusLabel: "Green Campus",
    statRatioNum: "1:15",
    statRatioLabel: "Mentorship Ratio",
    statLeadersNum: "800+",
    statLeadersLabel: "Future Leaders",

    aboutHeaderTag: "Nurturing Confident Learners",
    aboutHeaderTitle: "About Akshara Vidyaashram",
    aboutDescription: "Founded in 1993, Akshara Vidyaashram has established itself as an educational pioneer in Cuddalore. Built on a magnificent 25-acre green estate, our school rejects rote drilling and physical claustrophobia. We embrace child-centric, discovery-led models where kids learn amidst local flora, high-end infrastructure, and expert educators. True growth comes when students take intellectual responsibility in a secure environment designed for organic leadership.",

    whyChooseTitle: "Why Choose Akshara Vidyaashram",
    whyChooseSub: "Five core pillars that define our child-centered pedagogy and school life.",
    whyCards: [
      {
        title: "Individual Attention",
        description: "Regulated class structures with a 1:15 mentorship count, ensuring every single student's cognitive, physical, and sensory development is continuously tracked."
      },
      {
        title: "Experienced Faculty",
        description: "Our certified academic facilitators undergo rigorous, values-centered educational training, bringing expertise, absolute safety, and warm guidance."
      },
      {
        title: "Safe Learning Environment",
        description: "An open, security-screened, and mentally liberating 25-acre woodland campus featuring surveillance, dedicated female helpers, and first-aid medics."
      },
      {
        title: "Strong Academic Foundation",
        description: "A robust CBSE curriculum delivered through active inquiry, practical science lab discoveries, vast literature research, and analytical reasoning."
      },
      {
        title: "Value-Based Education",
        description: "We cultivate deep ethical responsibility, civic awareness, and deep ecological values, inspired by our foundational motto: 'Freedom with Responsibility'."
      }
    ],

    flyersTag: "Official Publications",
    flyersTitle: "Prominent Admission Flyers",
    flyersSub: "Review official posters and promotional literature of Akshara Vidyaashram.",
    flyer1Title: "Academic Excellence Program",
    flyer1Tag: "CBSE PATHWAY (KG to Grade 10)",
    flyer1Desc: "Comprehensive subject-matter integration with mandatory swimming, archery instruction, and immersive language labs on our safe 25-acre campus.",
    flyer2Title: "Holistic Physical Sanctuary",
    flyer2Tag: "SPORTS & SUSTAINABILITY CORES",
    flyer2Desc: "Nurturing motor skills and environmental responsibility through horticulture training, elite martial arts academy, and outdoor forest school lessons.",
    flyerPromoItem1: "Olympic-sized swimming arena with certified coaches",
    flyerPromoItem2: "Horticulture & active organic farming plots",
    flyerPromoItem3: "Focus mastery via Cuddalore's ultimate archery club",
    flyerPromoItem4: "Syllabus on eco-protection and green crafting",
    flyerCtaBtn: "Enquire About This Program",

    calculatorTitle: "Age Eligibility Calculator",
    calculatorSub: "Quickly evaluate the statutory grade placement according to state-approved thresholds.",
    calculatorLabelDob: "Select Child's Date of Birth:",
    calculatorBtnCheck: "Calculate Eligible Grade",
    calculatorResultEligible: "Your child is highly eligible for:",
    calculatorResultNotEligible: "Age out of kindergarten range. Please contact admissions team for advanced lateral entries.",
    calculatorResultPreFillBtn: "Pre-fill Enquiry Form with this Grade",

    enquiryTitle: "Reserve Your Admissions Gateway",
    enquirySub: "Submit an enquiry lead and book your direct interaction walkthrough slot on Cuddalore's ultimate 25-Acre Sanctuary."
  },
  ta: {
    navExperience: "25-ஏக்கர் வளாக அனுபவம்",
    navCurriculum: "பாடத்திட்டம்",
    navEligibility: "தகுதிச் சரிபார்ப்பு",
    navFaq: "கேள்வி-பதில்கள்",
    navAdmissionsDesk: "சேர்க்கை பிரிவு",
    navContactNumber: "+91 4142 227 000",
    navBookTour: "வளாக சுற்றுப்பயணம்",

    heroTagline: "கல்வியாண்டு 2026 - 2027 கல்விச் சேர்க்கை தொடங்குகிறது",
    heroHeadline: "கற்றல் சுதந்திரமாக வளரும் உன்னத இடம்",
    heroSubheadline: "கடலூரில் உள்ள 25 ஏக்கர் பரப்பளவு கொண்ட பசுமையான இயற்கை கல்வி வளாகம், இங்கு மாணவர்களுக்கு முழுமையான பாதுகாப்பு, ஒழுக்கம் மற்றும் தனித்திறன் பயிற்சிகள் வழங்கப்பட்டு தன்னம்பிக்கையுள்ள எதிர்கால தலைவர்களாக வளர்க்கப்படுகிறார்கள்.",
    heroTourCta: "வளாக சுற்றுப்பயணத்தை முன்பதிவு செய்",
    heroExploreCta: "25-ஏக்கர் வளாகத்தை ஆராய்",
    heroLegacyLabel: "100% உண்மையான சான்றுகள்",
    heroLegacyDesc: "AI கொண்டு உருவாக்கப்பட்ட குழந்தைகள் அல்லது போலி புகைப்படங்கள் இங்கு பயன்படுத்தப்படவில்லை. அனைத்தும் உண்மையான காட்சிகள்.",

    statLegacyNum: "30+ ஆண்டுகள்",
    statLegacyLabel: "நம்பிக்கையான பாரம்பரியம்",
    statCampusNum: "25 ஏக்கர்",
    statCampusLabel: "பசுமை சுற்றுச்சூழல்",
    statRatioNum: "1:15",
    statRatioLabel: "ஆசிரியர்-மாணவர் விகிதம்",
    statLeadersNum: "800+",
    statLeadersLabel: "எதிர்கால தலைவர்கள்",

    aboutHeaderTag: "தன்னம்பிக்கை கற்றல்",
    aboutHeaderTitle: "அக்ஷரா வித்யாஷ்ரம் பற்றி",
    aboutDescription: "1993 இல் நிறுவப்பட்ட அக்ஷரா வித்யாஷ்ரம் கடலூரின் முதன்மையான கல்வி நிறுவனமாக திகழ்கிறது. 25 ஏக்கர் இயற்கை வனப்பகுதியில் அமைந்துள்ள எங்கள் பள்ளி மனப்பாடக் கல்வியை மறுத்து, செயல்முறை கற்றலை ஊக்குவிக்கிறது. மாணவர்கள் மரங்களின் நிழலிலும், நவீன ஆய்வகங்களிலும், அர்ப்பணிப்புள்ள ஆசிரியர்களின் வழிகாட்டுதலிலும் பயில்கிறார்கள். ஒழுக்கம் மற்றும் சுதந்திரத்துடன் கூடிய கற்றலே மாணவர்களின் உண்மையான வளர்ச்சிக்கு வழிவகுக்கும் என்பதில் நாங்கள் உறுதியாக இருக்கிறோம்.",

    whyChooseTitle: "ஏன் அக்ஷராப் பள்ளியை தேர்வு செய்ய வேண்டும்?",
    whyChooseSub: "எங்கள் பள்ளியின் கல்விமுறை மற்றும் மாணவர்களின் வளர்ச்சிக்கு உதவும் ஐந்து முக்கிய தூண்கள்.",
    whyCards: [
      {
        title: "தனிநபர் கவனம் (Individual Attention)",
        description: "1:15 என்ற ஆசிரியர்-மாணவர் விகிதாச்சாரம் மூலம் ஒவ்வொரு குழந்தையின் தனித்திறன், உடல் நலம் மற்றும் அறிவுசார் வளர்ச்சி தொடர்ந்து சிறந்த முறையில் கண்காணிக்கப்படுகிறது."
      },
      {
        title: "அனுபவம் வாய்ந்த ஆசிரியர்கள் (Experienced Faculty)",
        description: "எங்கள் சான்றிதழ் பெற்ற ஆசிரியர்கள் தொடர் பயிற்சிகள் மற்றும் அன்பான வழிகாட்டுதல்கள் மூலம் குழந்தைகளுக்குத் தேவையான கல்வி மற்றும் ஒழுக்கத்தை ஊட்டுகின்றனர்."
      },
      {
        title: "பாதுகாப்பான கற்றல் சூழல் (Safe Learning Environment)",
        description: "25 ஏக்கர் பரந்து விரிந்த காவலாளிகள் கண்காணிப்புடன் கூடிய வளாகம், சிசிடிவி கண்காணிப்பு கேமராக்கள், பெண் உதவியாளர்கள் மற்றும் முதலுதவி வசதிகள் கொண்டது."
      },
      {
        title: "வலுவான கல்வி அடித்தளம் (Strong Academic Foundation)",
        description: "சிபிஎஸ்இ (CBSE) பாடத்திட்டத்தின் அடிப்படையில் அறிவியல் ஆய்வுகள், சிந்தனைத் திறன் தேடுதல் மற்றும் தொடர் விவாதங்கள் மூலம் கல்வி கற்பிக்கப்படுகிறது."
      },
      {
        title: "மதிப்புமிக்க பண்பாட்டுக் கல்வி (Value-Based Education)",
        description: "'சுதந்திரத்துடன் கூடிய பொறுப்புணர்வு' என்ற தாரக மந்திரத்துடன் சுற்றுச்சூழல் விழிப்புணர்வு, ஒழுக்கம் மற்றும் நற்பண்புகள் மாணவர்களுக்குக் கற்றுத்தரப்படுகின்றன."
      }
    ],

    flyersTag: "அதிகாரப்பூர்வ வெளியீடுகள்",
    flyersTitle: "முன்னணி சேர்க்கை சுவரொட்டிகள்",
    flyersSub: "அக்ஷரா வித்யாஷ்ரம் பள்ளியின் சேர்க்கை விவரங்கள் மற்றும் சுவரொட்டிகளைப் பார்வையிடுங்கள்.",
    flyer1Title: "அகாடமிக் எக்ஸலன்ஸ் திட்டம்",
    flyer1Tag: "CBSE வழிமுறை (Pre-KG முதல் 10-ஆம் வகுப்பு வரை)",
    flyer1Desc: "அனைத்து பாடங்களுடன் கட்டாய நீச்சல் மற்றும் வில்வித்தை பயிற்சிகள், மற்றும் நவீன மொழி ஆய்வகம் கொண்ட 25 ஏக்கர் பாதுகாப்பான வளாகம்.",
    flyer2Title: "முழுமையான விளையாட்டு & சுற்றுச்சூழல்",
    flyer2Tag: "உடற்திறன் & சுற்றுச்சூழல் கல்வி",
    flyer2Desc: "தோட்டக்கலை பயிற்சி, கராத்தே தற்காப்புப் பயிற்சி, மற்றும் இயற்கை வனப்பகுதியில் செயல்முறை கல்வி மூலம் குழந்தைகளின் ஒட்டுமொத்த உடல்-மன வளர்ச்சி ஊக்குவிக்கப்படுகிறது.",
    flyerPromoItem1: "சான்றளிக்கப்பட்ட பயிற்சியாளர்களுடன் கூடிய நீச்சல் குளம்",
    flyerPromoItem2: "இயற்கை விவசாயம் மற்றும் தோட்டக்கலை பயிற்சி",
    flyerPromoItem3: "கடலூரின் புகழ்பெற்ற வில்வித்தைப் பயிற்சி பள்ளி",
    flyerPromoItem4: "சுற்றுச்சூழல் பாதுகாப்பு மற்றும் கைவினைப் பயிற்சிகள்",
    flyerCtaBtn: "இத்திட்டம் குறித்து மேலும் தகவல்களைக் கேள்",

    calculatorTitle: "வயது தகுதி கணக்கீடு",
    calculatorSub: "அரசு அங்கீகரித்த வயது விதிமுறைகளின்படி உங்கள் குழந்தை எந்த வகுப்பிற்கு தகுதியானவர் என்பதை உடனடியாக சரிபார்க்கவும்.",
    calculatorLabelDob: "குழந்தையின் பிறந்த தேதியைத் தேர்ந்தெடுக்கவும்:",
    calculatorBtnCheck: "தகுதியான வகுப்பைக் கணக்கிடு",
    calculatorResultEligible: "உங்கள் குழந்தை இந்த வகுப்பில் சேர முழு தகுதி பெற்றுள்ளது:",
    calculatorResultNotEligible: "வயது வரம்பு இன்னும் எட்டப்படவில்லை அல்லது கூடுதல் விவரங்களுக்கு சேர்க்கை பிரிவை தொடர்பு கொள்ளவும்.",
    calculatorResultPreFillBtn: "இவ்வகுப்பை வினவல் படிவத்தில் தானாக நிரப்பு",

    enquiryTitle: "விண்ணப்ப வினவல் & நேரடி முன்பதிவு",
    enquirySub: "உங்கள் வினவலைச் சமர்ப்பித்து, கடலூரின் உன்னத 25 ஏக்கர் பசுமை வளாகத்தை நேரில் பார்வையிட நேரத்தை இப்போதே பதிவு செய்யுங்கள்."
  }
};
