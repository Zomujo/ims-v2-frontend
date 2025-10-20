import { ViewMode } from "@/features/shared/types/action.types";
import { PermissionModules } from "@/features/shared/types/auth-action.types";

export const API_ENDPOINTS_OLD = {
  LOGIN: "/auth/login",
  CREATE_ACCOUNT: "/auth/signup",
  REFRESH_TOKEN: "/auth/refresh?token=",
  FORGOT_PASSWORD: {
    SEND_MAIL: "/auth/forgot-password/send-mail",
    VERIFY_TOKEN: "/auth/forgot-password/validate-code",
    RESET_PASSWORD: "/auth/forgot-password/reset",
  },
  CHANGE_PASSWORD: "/auth/change-password",
  USER_PROFILE: "/auth/user",
  CHANGE_EMAIL: {
    SEND_MAIL: "/auth/change-email/send-mail",
    VERIFY_OTP: "/auth/change-email/validate-otp",
  },
  VERIFICATION: {
    SEND_MAIL: "/auth/verification/send-mail",
  },
  CHANGE_ACCOUNT_INFO: "/auth/",
  UPLOAD_PROFILE_PICTURE: "/auth/profile-picture",
  DEPARTMENTS: "/departments",
  ADMIN: {
    USERS: "/admin/users",
    USER: "/admin/user",
    DEACTIVATE_USER: "/admin/users/[id]/deactivate",
    ACTIVATE_USER: "/admin/users/[id]/activate",
    UPDATE_USER_ROLE: "/admin/users/[id]/role",
    ROLES: "/admin/roles",
  },
  SALES: "/sales",
  SALES_ITEMS: "/sales/items",
  PATIENTS: "/patients",
  SETTINGS_EXPIRY: "/user/settings/expiry",
  SALES_ICD_CODES: "/icd10cm/v3/search?sf=code,name",
};

export const AUTH_PAGE_ROUTES = {
  LOG_IN: "/auth/login",
  CREATE_ACCOUNT: "/auth/create-account",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  FORGOT_PASSWORD_VERIFY: "/auth/forgot-password/verify-code",
  SESSION_EXPIRY: "session-expired",
} as const;

export const PAGE_ROUTES = {
  DASHBOARD: "/dashboard",
  SETTINGS: {
    GENERAL: "/settings/general",
    SECURITY: "/settings/security",
    NOTIFICATIONS: "/settings/notifications",
    DEPARTMENTS: "/settings/departments",
    USERS: "/settings/users",
  },
  SALES: {
    VIEW: "/sales",
    RECORD: "/sales/record",
  },
  ITEMS: {
    VIEW: "/items",
    CREATE: "?state=create",
    BATCHES: "/items/batches",
  },
  ITEM_BATCHES: {
    VIEW: "/items/batches",
    CREATE: "?state=create",
  },
  SUPPLIERS: {
    VIEW: "/suppliers",
    CREATE: "?state=create",
  },
  CATEGORIES: {
    VIEW: "/categories",
    CREATE: "?state=create",
  },
  STOCK_ADJUSTMENT: {
    VIEW: "/stock-adjustment",
    CREATE: "?state=create",
  },
  EXPIRY: {
    VIEW: "/expiry",
  },
  ITEM_ORDERS: {
    VIEW: "/item-orders",
    CREATE: "?state=create",
  },
  DEPARTMENTS_REQUESTS: {
    VIEW: "/department-requests",
    CREATE: "?state=create",
  },
  REPORTS: "/reports",
  REPORTS_SALES_LEVEL: "/reports/earnings-overview",
  AUDIT_LOGS: "/audit-logs",
};

export const ACCESS_LEVELS = ["READ", "READ_WRITE", "READ_WRITE_DELETE"];
export const PERMISION_MODULES: (keyof typeof PermissionModules)[] = [
  "ITEMS",
  "SUPPLIERS",
  "SALES",
  "REPORTS",
  "ITEMS_CATEGORIES",
  "ITEMS_ORDERS",
  "STOCK_ADJUSTMENT",
  "DEPARTMENTS",
  "DEPARTMENT_REQUESTS",
  "USERS",
];
export const UI_STATE = "state";

export const featureOptions = [
  {
    label: "Items",
    value: PermissionModules.ITEMS,
  },
  {
    label: "Items Categories",
    value: PermissionModules.ITEMS_CATEGORIES,
  },
  {
    label: "Suppliers",
    value: PermissionModules.SUPPLIERS,
  },
  {
    label: "Reports",
    value: PermissionModules.REPORTS,
  },

  {
    label: "Stock Adjustments",
    value: PermissionModules.STOCK_ADJUSTMENT,
  },
  {
    label: "Departments",
    value: PermissionModules.DEPARTMENTS,
  },
  {
    label: "Departments Requests",
    value: PermissionModules.DEPARTMENT_REQUESTS,
  },
];

export const TESTIMONIALS = [
  {
    name: "Michael Mensah",
    position: "Chief Medical Officer / Korle-Bu",
    image: "/images/micheal.svg",
    message:
      "IMS has completely transformed how we manage our patient records. It’s user-friendly, reliable, and has made our operations more efficient than ever before.",
  },
  {
    name: "Elsie Osei",
    position: "Chief Financial Officer / Justab Hospital",
    image: "/images/elsie.svg",
    message:
      "Since adopting IMS, our clinic workflow has improved drastically. We can now focus more on patient care rather than paperwork. Highly recommended!",
  },
  {
    name: "Layla Keitting",
    position: "Chief Executive Officer / St. Joseph's Hospital",
    image: "/images/layla.svg",
    message:
      "The integration and onboarding process with IMS was seamless. The support team is outstanding, and the product delivers everything it promises.",
  },
];

export const FAQs = [
  {
    question: "What is IMS and who is it for?",
    answer:
      "IMS (Inventory Medical System) is a software platform designed to streamline operations for healthcare providers, including hospitals, clinics, and pharmacies. It helps with patient management, records, billing, and inventory tracking.",
  },
  {
    question: "Can I access IMS from multiple devices?",
    answer:
      "Yes, IMS is cloud-based and can be accessed from any internet-enabled device. This allows doctors, nurses, and administrators to collaborate in real time.",
  },
  {
    question: "Is my data secure with IMS?",
    answer:
      "Absolutely. IMS uses industry-standard encryption protocols and regular backups to ensure all patient and facility data remains secure and compliant with healthcare regulations.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer:
      "Yes, you can switch between Standard and Premium plans at any time. Just contact our support team or use the billing dashboard in your admin panel.",
  },
  {
    question: "Does IMS provide support and training?",
    answer:
      "Yes, we offer onboarding sessions, tutorials, and 24/7 support to ensure your team is fully equipped to use the platform effectively.",
  },
];

export const stockAdjustmentReasons = [
  { label: "Data Entry Error", value: "Data Entry Error" },
  { label: "Duplicate Entry Correction", value: "Duplicate Entry Correction" },
  { label: "Wrong Unit of Measure", value: "Wrong Unit of Measure" },
  { label: "Unrecorded Stock Found", value: "Unrecorded Stock Found" },
  { label: "Stocktaking Variance", value: "Stocktaking Variance" },
  { label: "Expired Medicines", value: "Expired Medicines" },
  { label: "Damaged or Spoiled Stock", value: "Damaged or Spoiled Stock" },
  { label: "Lost or Stolen Stock", value: "Lost or Stolen Stock" },
  {
    label: "Returns from Departments/Wards",
    value: "Returns from Departments/Wards",
  },
  {
    label: "Unrecorded Donations or Free Stock",
    value: "Unrecorded Donations or Free Stock",
  },
  { label: "Batch Number Correction", value: "Batch Number Correction" },
  { label: "Expiry Date Correction", value: "Expiry Date Correction" },
  {
    label: "Reclassification (e.g., NHIS to Cash)",
    value: "Reclassification (e.g., NHIS to Cash)",
  },
  { label: "Break Bulk Adjustment", value: "Break Bulk Adjustment" },
  { label: "Repackaging Adjustment", value: "Repackaging Adjustment" },
  {
    label: "Quarantine – Suspected Substandard Drug",
    value: "Quarantine – Suspected Substandard Drug",
  },
  { label: "Cold Chain Breach", value: "Cold Chain Breach" },
  { label: "Unlogged Internal Transfer", value: "Unlogged Internal Transfer" },
  { label: "System Sync Issue", value: "System Sync Issue" },
  { label: "Theft", value: "Theft" },
  {
    label: "Stock Regularization (Initial Balancing)",
    value: "Stock Regularization (Initial Balancing)",
  },
];

export const calendarOption: { mode: ViewMode; label: string }[] = [
  {
    mode: "day",
    label: "Day",
  },
  {
    mode: "this_week",
    label: "This week",
  },
  {
    mode: "month",
    label: "Month",
  },
  {
    mode: "last_three_months",
    label: "Last Three Months",
  },
  {
    mode: "this_year",
    label: "This year",
  },
] as const;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const BACK_BUTTON = {
  [PAGE_ROUTES.ITEM_BATCHES.VIEW]: {
    route: PAGE_ROUTES.ITEMS.VIEW,
  },
};

export const drugs = [
  { name: "Actilife Multivitamin Tablet", code: "MULTIVTA1" },
  { name: "Albendazole Tablet, 200mg", code: "ALBENDTA1" },
  { name: "Albendazole Tablet, 400mg", code: "ALBENDTA2" },
  { name: "Artemether/lumefantrine 20/120mg (6's)", code: "ARTLUMTA2" },
  { name: "Artemether/lumefantrine 20/120mg (12's)", code: "ARTLUMTA3" },
  { name: "Artemether/lumefantrine 20mg/120mg (18's)", code: "ARTLUMTA4" },
  { name: "Artemether/lumefantrine 20mg/120mg (24's)", code: "ARTLUMTA1" },
  {
    name: "Artesunate/amodiaquine tablet, 25/67.5mg (6 tabs)",
    code: "AMOARTTA1",
  },
  {
    name: "Artesunate/amodiaquine tablet, 25/67.5mg (3's)",
    code: "AMOARTTA3",
  },
  {
    name: "Artesunate/amodiaquine tablet, 50/135mg (12 tabs)",
    code: "AMOARTTA2",
  },
  {
    name: "Artesunate/amodiaquine tablet, 50/135mg (3's)",
    code: "AMOARTTA4",
  },
  {
    name: "Artesunate/Amodiaquine Tablet 100/270mg (3's)",
    code: "AMOARTTA5",
  },
  {
    name: "Artesunate/Amodiaquine Tablet 100/270mg (6's)",
    code: "AMOARTTA6",
  },
  { name: "Amlodipine Tablet 5mg", code: "AMLODITA1" },
  { name: "Amlodipine Tablet 10mg", code: "AMLODITA2" },
  { name: "Atorvastatin Tablet, 20mg", code: "ATORVATA2" },
  { name: "Amoxicillin Capsules, 500mg", code: "AMOXICCA2" },
  { name: "Amoxicillin Capsules, 250mg", code: "AMOXICCA1" },
  { name: "Azithromycin Capsule, 250mg", code: "AZITHRCA1" },
  { name: "Bendroflumethiazide Tablet, 2.5mg", code: "BENDROTA1" },
  { name: "Cefuroxime Tablet, 250mg", code: "CEFUROTA2" },
  { name: "Cefuroxime Tablet, 500mg", code: "CEFUROTA1" },
  { name: "Ciprofloxacin Tablet, 500mg", code: "CIPROFTA2" },
  { name: "Ciprofloxacin + Tinidazole (500+600mg)", code: "CIPRODTA1" },
  { name: "Clindamycin Capsules (150 mg)", code: "CLINDACA1" },
  { name: "Diazepam Tablet 5mg", code: "DIAZEPTA1" },
  { name: "Diazepam Tablet 10mg", code: "DIAZEPTA2" },
  { name: "Diclofenac Tablet, 50mg", code: "DICLOFTA2" },
  { name: "Diclofenac Capsule, 75mg", code: "DICLOFCA1" },
  { name: "Diclofenac Tablet, 100mg", code: "" },
  { name: "Doxycycline Capsules, 100mg", code: "DOXYCYCA1" },
  { name: "Erythromycin Tablet, 250mg", code: "ERYTHRTA1" },
  { name: "Flucloxacillin Capsules, 250mg", code: "FLUCLOCA1" },
  { name: "Folic Acid Tablet, 5mg", code: "FOLACITA1" },
  { name: "Ferrous Sulphate 60mg/Folic Acid 400mcg", code: "FESUFOTA1" },
  { name: "Fluconazole Cap, 150mg", code: "FLUCONCA1" },
  { name: "Furosemide Tablet, 40mg", code: "FUROSETA1" },
  { name: "Glimepiride Tablet, 2mg", code: "GLIMEPTA2" },
  { name: "Glimepiride Tablet, 4mg", code: "GLIMEPTA4" },
  { name: "Glibenclamide Tablet, 5mg", code: "GLIBENTA1" },
  { name: "Griseofulvin Tablet, 125mg", code: "GRISEOTA1" },
  { name: "Hyoscine Butylbromide Tablet, 10mg", code: "HYOBUTTA1" },
  { name: "Ibuprofen Tablet, 400mg", code: "IBUPROTA2" },
  { name: "Lisinopril Tablet, 10mg", code: "" },
  { name: "Losartan Tablet, 50mg", code: "LOSARTTA2" },
  { name: "Metoclopramide Tablet, 10mg", code: "METOCLTA1" },
  { name: "Metronidazole Tablet, 200mg", code: "METRONTA1" },
  { name: "Metronidazole Tablet, 400mg", code: "METRONTA2" },
  { name: "Multivitamin Tablet", code: "MULTIVTA1" },
  { name: "Nifedipine Tablet 20mg", code: "NIFEDITA2" },
  { name: "Nifedipine Tablet 30mg", code: "NIFEDITA3" },
  { name: "Mebendazole Tablet, 500mg", code: "MEBENDTA2" },
  { name: "Paracetamol Tablet, 500mg", code: "PARACETA1" },
  { name: "Salbutamol Tablet, 4mg", code: "" },
  { name: "Zinc Tablet, 20mg", code: "ZINCOOTA2" },

  {
    name: "Aluminium Hydroxide + Magnesium Hydroxide + Simethicone",
    code: "",
  },
  { name: "Artemether/ Lumefantrine Suspension 20/120mg", code: "ARTLUMSU1" },
  { name: "Amoxicillin Suspension 125mg/5ml", code: "AMOXICSU1" },
  { name: "Amoxicillin + Clavulanic Acid Suspension, 228mg", code: "" },
  { name: "Artesunate Suppository, 100mg", code: "ARTESURE2" },
  { name: "Azithromycin Suspension, 200mg/5ml", code: "AZITHRSU1" },
  { name: "Azithromycin Suspension, 200mg/5ml", code: "AZITHRSU2" },
  { name: "Carbocisteine Syrup, 125mg/5ml", code: "CARBOCSY1" },
  { name: "Carbocisteine Syrup, 250mg/5ml", code: "CARBOCSY2" },
  { name: "Cetirizine Syrup, 5mg/5ml", code: "CETIRISY1" },
  { name: "Clotrimazole cream 1%", code: "CLOTRICR1" },
  { name: "Clotrimazole cream 2%", code: "CLOTRICR2" },
  { name: "Clotrimazole Vagina Pessaries, 100mg", code: "CLOTRIVP1" },
  { name: "Clotrimazole + hydrocortisone + gentamycin cream", code: "" },
  { name: "Chloramphenicol Ear Drop (5%)", code: "CHLORAED1" },
  { name: "Chloramphenicol eye drop (0.5%)", code: "CHLORAID1" },
  { name: "Co-trimoxazole suspension, 240mg", code: "COTRIMSU1" },
  { name: "Chlorhexidine Gel, 7.1%", code: "CHLORHGE1" },
  { name: "Diclofenac gel", code: "DICLOFGE1" },
  { name: "Diclofenac Suppository, 100mg", code: "DICLOFRE2" },
  { name: "Diclofenac Suppository, 50mg", code: "DICLOFRE1" },
  { name: "Ephedrine Nasal Drop, 0.5%", code: "EPHEDRND1" },
  { name: "Ephedrine Nasal Drop, 1%", code: "EPHEDRND2" },
  { name: "Ferric Ammonium Citrate Syrup", code: "FEAMCISU1" },
  { name: "Flucloxacillin Suspension, 125mg/5ml", code: "FLUCLOSU1" },
  { name: "Gentamycin eye drop (0.3%)", code: "GENTAMID1" },
  { name: "Griseofulvin Suspension, 125mg/5ml", code: "GRISEOSU1" },
  { name: "Hydrocortisone Cream, 1%", code: "HYDROCCR1" },
  { name: "Ibuprofen Syrup, 100mg/5ml", code: "IBUPROSU1" },
  { name: "Iron 111 Polymaltose Syrup, 50mg/5ml", code: "IROPOLSU1" },
  { name: "Magnesium Triscillicate Suspension", code: "MAGTRIMI1" },
  { name: "Metronidazole Suspension, 200mg/5ml", code: "METRONSU2" },
  { name: "Multivitamin Syrup", code: "MULTIVSY1" },
  { name: "Oral Rehydration Salt", code: "ORRESAPO1" },
  { name: "Paracetamol Syrup, 125mg/5ml", code: "PARACESY1" },
  { name: "Paracetamol Suppository, 250mg", code: "PARACERE2" },
  { name: "Paracetamol Suppository, 500mg", code: "PARACERE3" },
  { name: "Promethazine Syrup, 5mg/5ml", code: "PROHYDEL1" },
  { name: "Simple Linctus Paediatric", code: "SIMLINSY1" },
  { name: "Simple Linctus Adult", code: "SIMLINSY2" },
  { name: "Timolol Eye Drop, 0.5%", code: "TIMMALID1" },
  { name: "Anti Snake Venom Injection (ASV)", code: "" },
  { name: "Anti Rabies Vaccine Injection (ARV)", code: "" },
  { name: "Anti Tetanus Serum Injection, (ATS) 1500IU", code: "ANTESEIN1" },
  { name: "Artesunate Injection 120mg", code: "ARTESUIN3" },
  { name: "Artesunate Injection, 60mg", code: "ARTESUIN2" },
  { name: "Artesunate Injection, 30mg", code: "ARTESUIN1" },
  { name: "Artemether Injection, 80mg", code: "ARTEMEIN2" },
  { name: "Amoxiclav Injection, 600mg (500 mg+100 mg)", code: "COAMOXIN1" },
  { name: "Benzylpenicillin Injection, 1MU", code: "BENZYLIN1" },
  { name: "Bupivacaine Heavy Injection", code: "" },
  { name: "Calcium gluconate Injection 10%", code: "CALGLUIN1" },
  { name: "Ceftriaxone Injection, 1g", code: "CEFTRIIN3" },
  { name: "Cefuroxime Injection, 750mg", code: "CEFUROIN1" },
  { name: "Ciprofloxacin Injection 200mg", code: "CIPROFIN1" },
  { name: "Clindamycin Injection, 300mg/2ml", code: "CLINDAIN1" },
  { name: "Chlorpromazine Injection, 50mg/2ml", code: "CHLPROIN1" },
  { name: "Cytotec Tablet, 200mcg", code: "" },
  { name: "Diazepam Injection, 10mg/2ml", code: "DIAZEPIN1" },
  { name: "Dexamethasone Injection, 4mg/ml", code: "DEXAMEIN1" },
  { name: "Ephedrine Injection, 30mg", code: "EPHEDRIN1" },
  { name: "Esomeprazole Injection, 40mg", code: "" },
  { name: "Hydralazine Injection, 20mg/ml", code: "HYDRALIN1" },
  { name: "Hydrocortisone Injection, 100mg", code: "HYSOSUIN1" },
  { name: "Hyoscine Butylbromide Injection, 20mg", code: "HYOBUTIN1" },
  { name: "Infusion Giving Set", code: "" },
  { name: "Ketamine 50mg/ml", code: "" },
  { name: "Labetalol Injection, 100mg", code: "" },
  { name: "Lidocaine Injection, 2%", code: "" },
  { name: "Magnesium sulphate Injection, 50%", code: "MAGSULIN3" },
  { name: "Metronidazole Injection, 500mg/100ml", code: "METRONIN1" },
  { name: "Metoclopramide Injection, 10mg", code: "METOCLIN1" },
  { name: "Misoprostol Tablet 200mcg", code: "" },
  { name: "Morphine Injection, 10mg/ml", code: "MORPHIIN1" },
  { name: "Omeprazole Injection, 40mg", code: "OMEPRAIN2" },
  { name: "Oxytocin Injection 10IU", code: "OXYTOCIN2" },
  { name: "Paracetamol Injection", code: "" },
  { name: "Pethidine Injection, 100mg/2ml", code: "PETHIDIN1" },
  { name: "Phytomenadione Injection, 1mg", code: "PHYTOMIN1" },
  { name: "Phenobarbitone Injection, 200mg", code: "PHENOBIN1" },
  { name: "Promethazine Injection, 50mg/2ml", code: "PROHYDIN1" },
  { name: "Propofol Injection 1%", code: "" },
  { name: "Salbutamol Nebules 2.5mg", code: "SALBUTGA2" },
  { name: "Salbutamol Nebules 5mg", code: "SALBUTGA3" },
  { name: "Tranexamic acid Injection, 500mg", code: "TRAACIIN1" },
  { name: "Water for Injection", code: "WATFORIN1" },
];
