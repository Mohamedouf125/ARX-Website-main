export interface TeamMember {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  job: {
    en: string;
    ar: string;
  };
  image: string;
  email: string;
  phone: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  about: {
    en: string;
    ar: string;
  };
  experience: {
    en: string[];
    ar: string[];
  };
  coverLetter: {
    en: string;
    ar: string;
  };
  education: {
    en: string[];
    ar: string[];
  };
  achievements: {
    en: string[];
    ar: string[];
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "ahmed-omar",
    name: {
      en: "Dr. Ahmed Omar",
      ar: "الدكتور أحمد عمر"
    },
    job: {
      en: "Chairman & CEO",
      ar: "رئيس مجلس الإدارة"
    },
    image: "https://storage.googleapis.com/furniture-hub/arx/about_us/2.webp",
    email: "ahmed.omar@arxdevelopments.com",
    phone: "+20 10 1234 5678",
    social: {
      facebook: "https://facebook.com/ahmed.omar.arx",
      instagram: "https://instagram.com/ahmed.omar.arx",
      twitter: "https://twitter.com/ahmed_omar_arx",
      linkedin: "https://linkedin.com/in/ahmed-omar-arx"
    },
    about: {
      en: "Dr. Ahmed Omar is a visionary leader with over 25 years of experience in real estate development. He has successfully led ARX Developments to become one of Egypt's most trusted and innovative real estate companies. His strategic vision and commitment to excellence have been instrumental in shaping the company's growth and success.",
      ar: "الدكتور أحمد عمر هو قائد رؤيوي يتمتع بأكثر من 25 عاماً من الخبرة في التطوير العقاري. لقد قاد بنجاح شركة آركس للتطوير العقاري لتصبح واحدة من أكثر الشركات العقارية موثوقية وابتكاراً في مصر. رؤيته الاستراتيجية والتزامه بالتميز كانا أساسيين في تشكيل نمو ونجاح الشركة."
    },
    experience: {
      en: [
        "Led the development of over 50 residential and commercial projects across Egypt",
        "Established strategic partnerships with international real estate firms",
        "Implemented innovative sustainability practices in all development projects",
        "Oversaw the company's expansion into new markets and territories"
      ],
      ar: [
        "قاد تطوير أكثر من 50 مشروعاً سكنياً وتجارياً في جميع أنحاء مصر",
        "أسس شراكات استراتيجية مع شركات عقارية دولية",
        "نفذ ممارسات الاستدامة المبتكرة في جميع مشاريع التطوير",
        "أشرف على توسع الشركة في أسواق وأقاليم جديدة"
      ]
    },
    coverLetter: {
      en: "As the Chairman and CEO of ARX Developments, I am committed to delivering exceptional real estate solutions that exceed our clients' expectations. Our focus on quality, innovation, and sustainability drives everything we do. I believe in creating not just buildings, but communities that enhance the quality of life for generations to come.",
      ar: "بصفتي رئيس مجلس الإدارة والمدير التنفيذي لشركة آركس للتطوير العقاري، أنا ملتزم بتقديم حلول عقارية استثنائية تتجاوز توقعات عملائنا. تركيزنا على الجودة والابتكار والاستدامة يدفع كل ما نقوم به. أؤمن بإنشاء ليس فقط مباني، بل مجتمعات تعزز جودة الحياة للأجيال القادمة."
    },
    education: {
      en: [
        "Ph.D. in Real Estate Development - Cairo University",
        "Master's in Business Administration - American University in Cairo",
        "Bachelor's in Civil Engineering - Alexandria University"
      ],
      ar: [
        "دكتوراه في التطوير العقاري - جامعة القاهرة",
        "ماجستير في إدارة الأعمال - الجامعة الأمريكية في القاهرة",
        "بكالوريوس في الهندسة المدنية - جامعة الإسكندرية"
      ]
    },
    achievements: {
      en: [
        "Real Estate Developer of the Year 2023 - Egypt Real Estate Awards",
        "Excellence in Leadership Award 2022 - Middle East Property Awards",
        "Innovation in Sustainable Development 2021 - African Real Estate Summit"
      ],
      ar: [
        "مطور العقارات للعام 2023 - جوائز العقارات المصرية",
        "جائزة التميز في القيادة 2022 - جوائز العقارات في الشرق الأوسط",
        "الابتكار في التنمية المستدامة 2021 - قمة العقارات الأفريقية"
      ]
    }
  },
  {
    id: "yasser-omar",
    name: {
      en: "Eng. Yasser Omar",
      ar: "المهندس ياسر عمر"
    },
    job: {
      en: "Deputy CEO",
      ar: "المدير التنفيذي"
    },
    image: "https://storage.googleapis.com/furniture-hub/arx/about_us/3%20(1).webp",
    email: "yasser.omar@arxdevelopments.com",
    phone: "+20 10 2345 6789",
    social: {
      facebook: "https://facebook.com/yasser.omar.arx",
      instagram: "https://instagram.com/yasser.omar.arx",
      linkedin: "https://linkedin.com/in/yasser-omar-arx"
    },
    about: {
      en: "Eng. Yasser Omar brings over 20 years of operational excellence to ARX Developments. As Managing Director, he oversees all aspects of project execution, ensuring that every development meets the highest standards of quality and innovation. His hands-on approach and attention to detail have been crucial to the company's success.",
      ar: "يجلب المهندس ياسر عمر أكثر من 20 عاماً من التميز التشغيلي إلى شركة آركس للتطوير العقاري. بصفته المدير التنفيذي، يشرف على جميع جوانب تنفيذ المشاريع، مما يضمن أن كل مشروع يلبي أعلى معايير الجودة والابتكار. نهجه العملي واهتمامه بالتفاصيل كانا حاسمين لنجاح الشركة."
    },
    experience: {
      en: [
        "Managed the successful delivery of 30+ major development projects",
        "Developed and implemented operational excellence programs",
        "Led cross-functional teams of over 200 professionals",
        "Established quality control systems and best practices"
      ],
      ar: [
        "أدار التسليم الناجح لأكثر من 30 مشروع تطوير رئيسي",
        "طور ونفذ برامج التميز التشغيلي",
        "قاد فرق متعددة الوظائف من أكثر من 200 محترف",
        "أسس أنظمة مراقبة الجودة وأفضل الممارسات"
      ]
    },
    coverLetter: {
      en: "My role as Managing Director is to ensure that every project we undertake reflects our commitment to excellence. I believe in leading by example and fostering a culture of continuous improvement. Our success is measured not just by the buildings we create, but by the lasting impact we have on communities and the environment.",
      ar: "دوري كمدير تنفيذي هو ضمان أن كل مشروع نقوم به يعكس التزامنا بالتميز. أؤمن بالقيادة بالقدوة وتعزيز ثقافة التحسين المستمر. نجاحنا يُقاس ليس فقط بالمباني التي ننشئها، بل بالتأثير الدائم الذي نحدثه في المجتمعات والبيئة."
    },
    education: {
      en: [
        "Master's in Project Management - British University in Egypt",
        "Bachelor's in Architecture - Ain Shams University",
        "Professional Certification in Real Estate Development"
      ],
      ar: [
        "ماجستير في إدارة المشاريع - الجامعة البريطانية في مصر",
        "بكالوريوس في العمارة - جامعة عين شمس",
        "شهادة مهنية في التطوير العقاري"
      ]
    },
    achievements: {
      en: [
        "Project Management Excellence Award 2023",
        "Operational Leadership Award 2022",
        "Best Practice Implementation Award 2021"
      ],
      ar: [
        "جائزة التميز في إدارة المشاريع 2023",
        "جائزة القيادة التشغيلية 2022",
        "جائزة تنفيذ أفضل الممارسات 2021"
      ]
    }
  },
  {
    id: "saad-omar",
    name: {
      en: "Dr. Saad Omar",
      ar: "الدكتور سعد عمر"
    },
    job: {
      en: "Board Member",
      ar: "عضو مجلس الإدارة"
    },
    image: "https://storage.googleapis.com/furniture-hub/arx/about_us/4.webp",
    email: "saad.omar@arxdevelopments.com",
    phone: "+20 10 3456 7890",
    social: {
      linkedin: "https://linkedin.com/in/saad-omar-arx",
      twitter: "https://twitter.com/saad_omar_arx"
    },
    about: {
      en: "Dr. Saad Omar is a technical visionary who ensures that all ARX Developments projects incorporate the latest innovations and sustainable technologies. With extensive experience in engineering and construction management, he leads our technical teams in creating structures that are not only beautiful but also environmentally responsible and technologically advanced.",
      ar: "الدكتور سعد عمر هو رؤيوي تقني يضمن أن جميع مشاريع آركس للتطوير العقاري تتضمن أحدث الابتكارات والتقنيات المستدامة. مع خبرة واسعة في الهندسة وإدارة البناء، يقود فرقنا التقنية في إنشاء هياكل ليست جميلة فحسب، بل مسؤولة بيئياً ومتطورة تقنياً."
    },
    experience: {
      en: [
        "Spearheaded the implementation of green building technologies",
        "Developed innovative construction methodologies",
        "Led technical teams in complex infrastructure projects",
        "Established partnerships with leading technology providers"
      ],
      ar: [
        "قاد تنفيذ تقنيات المباني الخضراء",
        "طور منهجيات بناء مبتكرة",
        "قاد الفرق التقنية في مشاريع البنية التحتية المعقدة",
        "أسس شراكات مع مزودي التقنيات الرائدة"
      ]
    },
    coverLetter: {
      en: "Technology and sustainability are at the heart of everything we do at ARX Developments. As Technical Director, I am passionate about pushing the boundaries of what's possible in real estate development. We're not just building for today; we're creating the infrastructure for tomorrow's sustainable cities.",
      ar: "التقنية والاستدامة هما في قلب كل ما نقوم به في شركة آركس للتطوير العقاري. بصفتي المدير التقني، أنا شغوف بدفع حدود ما هو ممكن في التطوير العقاري. نحن لا نبني فقط لليوم؛ نحن ننشئ البنية التحتية للمدن المستدامة في الغد."
    },
    education: {
      en: [
        "Ph.D. in Civil Engineering - Cairo University",
        "Master's in Sustainable Development - American University in Cairo",
        "Bachelor's in Construction Engineering - Alexandria University"
      ],
      ar: [
        "دكتوراه في الهندسة المدنية - جامعة القاهرة",
        "ماجستير في التنمية المستدامة - الجامعة الأمريكية في القاهرة",
        "بكالوريوس في هندسة البناء - جامعة الإسكندرية"
      ]
    },
    achievements: {
      en: [
        "Innovation in Construction Technology Award 2023",
        "Sustainable Development Leadership Award 2022",
        "Technical Excellence Award 2021"
      ],
      ar: [
        "جائزة الابتكار في تقنيات البناء 2023",
        "جائزة قيادة التنمية المستدامة 2022",
        "جائزة التميز التقني 2021"
      ]
    }
  },
  {
    id: "osama-omar",
    name: {
      en: "Dr. Osama Omar",
      ar: "الدكتور أسامة عمر"
    },
    job: {
      en: "Board Member",
      ar: "عضو مجلس الإدارة"
    },
    image: "https://storage.googleapis.com/furniture-hub/arx/about_us/1%20(1).webp",
    email: "osama.omar@arxdevelopments.com",
    phone: "+20 10 4567 8901",
    social: {
      linkedin: "https://linkedin.com/in/osama-omar-arx"
    },
    about: {
      en: "Dr. Osama Omar oversees all financial operations and strategic investments for ARX Developments. With deep expertise in real estate finance and investment management, he ensures the company's financial stability while identifying new opportunities for growth and expansion. His strategic financial planning has been instrumental in the company's sustained success.",
      ar: "يشرف الدكتور أسامة عمر على جميع العمليات المالية والاستثمارات الاستراتيجية لشركة آركس للتطوير العقاري. مع خبرة عميقة في التمويل العقاري وإدارة الاستثمار، يضمن الاستقرار المالي للشركة مع تحديد فرص جديدة للنمو والتوسع. تخطيطه المالي الاستراتيجي كان أساسياً في النجاح المستمر للشركة."
    },
    experience: {
      en: [
        "Managed multi-billion dollar real estate investment portfolios",
        "Developed innovative financing solutions for large-scale projects",
        "Led successful IPO and capital raising initiatives",
        "Established strategic partnerships with international financial institutions"
      ],
      ar: [
        "أدار محافظ استثمارات عقارية متعددة المليارات",
        "طور حلول تمويل مبتكرة للمشاريع واسعة النطاق",
        "قاد مبادرات الاكتتاب العام وجمع رأس المال الناجحة",
        "أسس شراكات استراتيجية مع المؤسسات المالية الدولية"
      ]
    },
    coverLetter: {
      en: "Financial excellence is the foundation upon which great companies are built. As Financial Director, I am committed to ensuring that ARX Developments maintains the highest standards of financial integrity and transparency. Our success is built on sound financial management and strategic investment decisions that create long-term value for all stakeholders.",
      ar: "التميز المالي هو الأساس الذي تُبنى عليه الشركات العظيمة. بصفتي المدير المالي، أنا ملتزم بضمان أن تحافظ شركة آركس للتطوير العقاري على أعلى معايير النزاهة والشفافية المالية. نجاحنا مبني على الإدارة المالية السليمة وقرارات الاستثمار الاستراتيجية التي تخلق قيمة طويلة الأجل لجميع أصحاب المصلحة."
    },
    education: {
      en: [
        "Ph.D. in Finance - Cairo University",
        "Master's in Investment Management - London School of Economics",
        "Bachelor's in Economics - American University in Cairo"
      ],
      ar: [
        "دكتوراه في المالية - جامعة القاهرة",
        "ماجستير في إدارة الاستثمار - كلية لندن للاقتصاد",
        "بكالوريوس في الاقتصاد - الجامعة الأمريكية في القاهرة"
      ]
    },
    achievements: {
      en: [
        "Financial Leadership Award 2023 - Middle East Finance Awards",
        "Investment Excellence Award 2022 - Real Estate Investment Forum",
        "Strategic Financial Planning Award 2021"
      ],
      ar: [
        "جائزة القيادة المالية 2023 - جوائز الشرق الأوسط المالية",
        "جائزة التميز في الاستثمار 2022 - منتدى الاستثمار العقاري",
        "جائزة التخطيط المالي الاستراتيجي 2021"
      ]
    }
  }
];

export const getTeamMember = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const getAllTeamMembers = (): TeamMember[] => {
  return teamMembers;
}; 