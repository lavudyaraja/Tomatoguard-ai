import { DiseaseInfo } from "./types";

/**
 * Real agricultural reference data for tomato diseases.
 * Sources: University extension programs, FAO, agricultural research papers.
 */
export const DISEASE_DATABASE: Record<string, DiseaseInfo> = {
    Bacterial_spot: {
        name: "Bacterial_spot",
        displayName: "Bacterial Spot",
        severity: "high",
        description:
            "Bacterial spot is caused by Xanthomonas species. It affects leaves, stems, and fruit, causing dark water-soaked lesions that can severely reduce yield and fruit quality across warm, humid growing seasons.",
        symptoms: [
            "Small, dark, water-soaked spots on leaves",
            "Lesions may develop yellow halos around the edges",
            "Spots become raised and scab-like on fruit surfaces",
            "Severe defoliation in advanced or untreated stages",
            "Lesions may coalesce into large necrotic areas on leaves",
        ],
        causes: [
            "Xanthomonas campestris pv. vesicatoria bacteria",
            "Warm, humid weather conditions (24–30°C)",
            "Overhead irrigation and rain-splash dispersal",
            "Contaminated seeds or transplants introducing the pathogen",
        ],
        treatments: [
            "Apply copper-based bactericides at the earliest signs of infection",
            "Use streptomycin sprays where legally permitted in your region",
            "Remove and destroy all severely infected plant material",
            "Switch to drip irrigation to reduce foliar wetness and splash dispersal",
        ],
        prevention: [
            "Use certified disease-free seeds and transplants only",
            "Practice a strict 2–3 year crop rotation cycle",
            "Choose resistant or tolerant tomato varieties for your region",
            "Sanitize all tools and equipment between uses",
            "Ensure adequate plant spacing for good air circulation",
        ],
    },

    Early_blight: {
        name: "Early_blight",
        displayName: "Early Blight",
        severity: "moderate",
        description:
            "Early blight, caused by Alternaria solani, is one of the most common tomato diseases worldwide. It produces characteristic concentric-ring 'target spot' lesions on older leaves and causes significant progressive defoliation.",
        symptoms: [
            "Dark brown lesions with concentric rings forming a target pattern",
            "Lesions typically start on older, lower leaves and move upward",
            "Yellowing (chlorosis) around each individual lesion",
            "Progressive defoliation from the bottom of the plant upward",
            "Dark, leathery sunken spots on fruit near the stem end",
        ],
        causes: [
            "Alternaria solani fungal pathogen",
            "Warm temperatures (24–29°C) combined with high humidity",
            "Prolonged periods of leaf wetness after irrigation or rain",
            "Overhead irrigation wetting foliage regularly",
            "Poor air circulation and excessively dense plantings",
        ],
        treatments: [
            "Apply chlorothalonil or mancozeb fungicides preventively before symptoms appear",
            "Use azoxystrobin or difenoconazole for curative treatment after onset",
            "Remove infected lower leaves immediately to slow upward spread",
            "Apply fungicides on a consistent 7–10 day schedule during wet conditions",
        ],
        prevention: [
            "Mulch around plant bases to prevent soil splash onto leaves",
            "Use drip irrigation instead of overhead watering",
            "Stake or cage plants to improve air circulation",
            "Remove all plant debris thoroughly at end of each growing season",
            "Rotate crops on a minimum 2–3 year cycle to break disease cycle",
        ],
    },

    Late_blight: {
        name: "Late_blight",
        displayName: "Late Blight",
        severity: "critical",
        description:
            "Late blight, caused by Phytophthora infestans, is one of the most destructive tomato diseases known. It can devastate entire fields within days under favorable conditions — this is the same pathogen responsible for the Irish Potato Famine of the 1840s.",
        symptoms: [
            "Large, irregular, water-soaked gray-green lesions on leaves",
            "White fuzzy mold growth visible on leaf undersides in humid conditions",
            "Lesions rapidly turn brown or black with a papery, brittle texture",
            "Dark, firm lesions with a greasy appearance on stems",
            "Large, greasy-looking brown spots appearing on fruit surfaces",
        ],
        causes: [
            "Phytophthora infestans oomycete (water mold) pathogen",
            "Cool, wet weather conditions (15–22°C with high relative humidity)",
            "Prolonged leaf wetness exceeding 10 continuous hours",
            "Wind-borne sporangia that can travel significant distances",
            "Infected potato or tomato debris remaining in or near fields",
        ],
        treatments: [
            "Apply mefenoxam or metalaxyl-based fungicides immediately upon detection",
            "Use chlorothalonil as an effective protectant fungicide",
            "Destroy ALL infected plant material by burning or deep burial — never compost",
            "Apply fungicides every 5–7 days continuously during active outbreaks",
            "Isolate affected plants immediately to prevent rapid spread",
        ],
        prevention: [
            "Plant TYLCV-resistant varieties such as 'Mountain Magic' or 'Defiant'",
            "Avoid all overhead irrigation to minimize foliar wetness",
            "Ensure excellent air circulation through proper plant spacing and pruning",
            "Monitor weather forecasts actively for blight-favorable conditions",
            "Remove volunteer tomato and potato plants from surrounding areas",
        ],
    },

    Leaf_Mold: {
        name: "Leaf_Mold",
        displayName: "Leaf Mold",
        severity: "moderate",
        description:
            "Leaf mold, caused by Passalora fulva (formerly Cladosporium fulvum), primarily affects greenhouse-grown tomatoes. It thrives in high humidity and poor ventilation, spreading rapidly if conditions are not corrected.",
        symptoms: [
            "Pale green to yellowish spots developing on upper leaf surfaces",
            "Olive-green to grayish-purple fuzzy mold growing on lower leaf surfaces",
            "Leaves curling, withering, and dropping prematurely from the plant",
            "Usually starts on older, lower leaves and progresses upward",
            "Fruit infection is rare but may show dark, leathery rot at the stem end",
        ],
        causes: [
            "Passalora fulva (Cladosporium fulvum) fungal pathogen",
            "High relative humidity consistently above 85%",
            "Poor ventilation, particularly in enclosed greenhouses",
            "Optimal temperature range of 22–24°C for pathogen development",
            "Dense plant canopy severely limiting airflow between plants",
        ],
        treatments: [
            "Improve greenhouse ventilation immediately as first priority",
            "Apply fungicides containing chlorothalonil or mancozeb",
            "Remove and destroy all severely infected leaves to reduce spore load",
            "Reduce ambient humidity by increasing air circulation using fans",
        ],
        prevention: [
            "Use resistant tomato varieties carrying Cf resistance genes",
            "Maintain greenhouse relative humidity consistently below 85%",
            "Ensure proper plant spacing to allow air movement between plants",
            "Install and operate fans to actively improve air circulation",
            "Avoid wetting foliage during irrigation at all times",
        ],
    },

    Septoria_leaf_spot: {
        name: "Septoria_leaf_spot",
        displayName: "Septoria Leaf Spot",
        severity: "moderate",
        description:
            "Septoria leaf spot, caused by Septoria lycopersici, is a common foliar disease characterized by many small spots on leaves. While it rarely kills plants directly, severe defoliation reduces yield and exposes fruit to sunscald damage.",
        symptoms: [
            "Numerous small (2–3mm) circular spots with dark brown borders",
            "Spots have tan or gray centers containing tiny dark specks (pycnidia)",
            "Disease starts on lower leaves and steadily progresses upward",
            "Heavy infection causes widespread yellowing and premature defoliation",
            "Fruit is generally not directly affected by this pathogen",
        ],
        causes: [
            "Septoria lycopersici fungal pathogen",
            "Warm, wet growing conditions (20–25°C optimal range)",
            "Rain splash and overhead irrigation spreading spores",
            "Infected plant debris persisting in soil from previous seasons",
            "Extended periods of leaf wetness exceeding several hours",
        ],
        treatments: [
            "Apply chlorothalonil or copper-based fungicides at the very first signs",
            "Remove and destroy all infected lower leaves promptly",
            "Apply fungicides on 7–14 day intervals consistently during wet periods",
            "Use mancozeb or azoxystrobin for effective disease control",
        ],
        prevention: [
            "Remove and destroy all tomato crop debris at the end of each season",
            "Practice a minimum 2–3 year crop rotation to break the disease cycle",
            "Apply mulch around plant bases to prevent rain splash from soil",
            "Use drip irrigation exclusively — avoid wetting leaves during watering",
            "Stake or cage plants to improve airflow and reduce leaf wetness",
        ],
    },

    "Spider_mites_Two-spotted_spider_mite": {
        name: "Spider_mites_Two-spotted_spider_mite",
        displayName: "Spider Mites (Two-spotted)",
        severity: "moderate",
        description:
            "Two-spotted spider mites (Tetranychus urticae) are tiny arachnid pests that feed on plant cell contents. They are not a fungal disease but can cause severe damage resembling disease symptoms, especially under hot, dry field conditions.",
        symptoms: [
            "Fine stippling — tiny yellow or white feeding dots — on upper leaf surfaces",
            "Leaves progressively turn bronze, then brown and crispy as damage accumulates",
            "Fine silky webbing visible on leaf undersides and between stems",
            "Individual mites are tiny (≈0.5mm) and visible only with a hand lens",
            "Plants appear dusty or drought-stressed even with adequate watering",
        ],
        causes: [
            "Tetranychus urticae (two-spotted spider mite) population outbreak",
            "Hot, dry conditions (above 27°C with low relative humidity)",
            "Dusty field or greenhouse conditions stressing plants",
            "Overuse of broad-spectrum insecticides eliminating natural predators",
            "Plant water or nutrient stress making them more susceptible to attack",
        ],
        treatments: [
            "Apply targeted miticides such as abamectin, spiromesifen, or bifenazate",
            "Use horticultural oil or insecticidal soap sprays for organic control",
            "Release predatory mites (Phytoseiulus persimilis) as a biocontrol strategy",
            "Spray plants thoroughly with a strong water jet to dislodge mite colonies",
            "Rotate miticide chemical classes strictly to prevent resistance buildup",
        ],
        prevention: [
            "Maintain consistent adequate irrigation to avoid plant stress",
            "Monitor plants weekly with a hand lens, especially during hot dry weather",
            "Preserve natural predator populations by avoiding broad-spectrum insecticides",
            "Keep field perimeters free of weeds that can harbor large mite populations",
            "Increase relative humidity in greenhouses during hot dry periods",
        ],
    },

    Target_Spot: {
        name: "Target_Spot",
        displayName: "Target Spot",
        severity: "moderate",
        description:
            "Target spot, caused by Corynespora cassiicola, produces distinctive concentric target-like lesions on tomato foliage. It can cause significant defoliation and fruit quality reduction under warm, humid growing conditions.",
        symptoms: [
            "Small brown spots with concentric rings forming a distinct target pattern",
            "Lesions often surrounded by a yellow halo on the leaf surface",
            "Spots can appear on leaves, petioles, stems, and fruit simultaneously",
            "Lower and middle canopy leaves are typically affected first",
            "Severe infection leads to rapid premature defoliation of the plant",
        ],
        causes: [
            "Corynespora cassiicola fungal pathogen",
            "Warm temperatures (25–30°C) combined with high relative humidity",
            "Extended periods of leaf wetness after rain or irrigation",
            "Dense plant canopy that restricts airflow between plants",
            "Infected plant debris remaining in soil from previous growing seasons",
        ],
        treatments: [
            "Apply azoxystrobin or difenoconazole fungicides at earliest symptom appearance",
            "Use chlorothalonil as a broad-spectrum protectant spray program",
            "Remove and destroy all infected leaves to reduce spore inoculum",
            "Improve plant spacing to facilitate better air circulation throughout canopy",
        ],
        prevention: [
            "Use resistant tomato varieties wherever commercially available",
            "Practice a minimum 2-year crop rotation between susceptible host crops",
            "Apply mulch around plant bases to prevent soil splash onto lower leaves",
            "Avoid any field activities with wet plants to minimize spore dispersal",
            "Clean up and destroy all plant debris thoroughly at the end of the season",
        ],
    },

    Tomato_Yellow_Leaf_Curl_Virus: {
        name: "Tomato_Yellow_Leaf_Curl_Virus",
        displayName: "Yellow Leaf Curl Virus (TYLCV)",
        severity: "critical",
        description:
            "Tomato Yellow Leaf Curl Virus (TYLCV) is a devastating viral disease transmitted exclusively by the silverleaf whitefly (Bemisia tabaci). Infected plants become severely stunted, and there is no cure once a plant is infected.",
        symptoms: [
            "Severe upward curling and cupping of leaves — a hallmark symptom",
            "Pronounced yellowing of leaf margins and interveinal areas",
            "Severe stunting of plant growth with markedly shortened internodes",
            "Flower drop before fruit set, causing catastrophic yield loss",
            "Plants infected during early stages may produce zero marketable fruit",
        ],
        causes: [
            "Tomato Yellow Leaf Curl Virus (TYLCV), classified as a begomovirus",
            "Transmitted exclusively by the silverleaf whitefly (Bemisia tabaci)",
            "Whiteflies can acquire the virus after just 15–30 minutes of feeding",
            "Once acquired, the virus persists within the whitefly for its entire lifespan",
            "Warm climates and protected structures greatly favor whitefly population growth",
        ],
        treatments: [
            "No cure exists — remove and completely destroy all infected plants immediately",
            "Control whitefly vector populations with imidacloprid or pyriproxyfen insecticides",
            "Deploy yellow sticky traps throughout the field to monitor and reduce whitefly numbers",
            "Apply neem oil or insecticidal soaps for management of lighter infestations",
            "Introduce Encarsia formosa parasitoid wasps as a biological whitefly control agent",
        ],
        prevention: [
            "Plant only TYLCV-resistant tomato varieties carrying Ty-1, Ty-2, or Ty-3 resistance genes",
            "Apply reflective aluminum or silver mulches to actively repel whitefly populations",
            "Install fine-mesh insect-proof screens on all greenhouse openings",
            "Remove infected plants and nearby weed reservoir hosts promptly",
            "Avoid establishing new plantings adjacent to previously infected fields",
            "Source transplants from certified whitefly-free nursery production systems only",
        ],
    },

    Tomato_mosaic_virus: {
        name: "Tomato_mosaic_virus",
        displayName: "Tomato Mosaic Virus (ToMV)",
        severity: "high",
        description:
            "Tomato Mosaic Virus (ToMV) is a highly stable and extremely contagious tobamovirus. It can survive on contaminated surfaces, tools, and seeds for years, spreading rapidly through mechanical contact and reducing yields by 20–70%.",
        symptoms: [
            "Characteristic light and dark green mosaic mottling pattern on leaves",
            "Leaf curling, distortion, and fern-like narrowing (shoe-string symptom)",
            "Stunted overall plant growth with significantly reduced vigor",
            "Uneven fruit ripening and internal fruit browning (blotchy ripening)",
            "Yellow ring spots appearing on fruit surfaces in some strains",
        ],
        causes: [
            "Tomato Mosaic Virus (ToMV), a highly stable tobamovirus",
            "Extremely contagious via any mechanical contact — hands, tools, clothing",
            "Can survive on contaminated surfaces, soil, and debris for many years",
            "Seed-borne transmission is documented, especially in older seed stocks",
            "Rapid spread when workers handle infected then healthy plants in sequence",
        ],
        treatments: [
            "No effective chemical treatment exists for any viral plant infection",
            "Remove and completely destroy all visibly infected plants immediately",
            "Disinfect all tools with a 10% bleach solution or trisodium phosphate",
            "Wash hands thoroughly with soap and water before handling any plants",
            "Do NOT smoke or use tobacco products near tomato plants (cross-infection risk)",
        ],
        prevention: [
            "Use only ToMV-resistant varieties carrying Tm-2 or Tm-2² resistance genes",
            "Obtain certified virus-free seeds from reputable commercial suppliers only",
            "Disinfect all greenhouse structures and equipment completely between growing cycles",
            "Implement mandatory strict personal hygiene protocols for all field workers",
            "Dip hands in milk solution before handling plants — proteins inactivate tobamovirus",
            "Minimize all unnecessary physical contact with plants throughout the season",
        ],
    },

    healthy: {
        name: "healthy",
        displayName: "Healthy",
        severity: "low",
        description:
            "The analyzed tomato leaf shows no visible signs of disease, pest damage, or nutrient deficiency. The plant appears to be in good health. Maintain your current cultural practices and continue regular monitoring.",
        symptoms: [
            "Uniform, rich dark green coloration across the entire leaf surface",
            "No spots, lesions, water-soaking, or discoloration of any kind",
            "Normal leaf shape and texture with no curling or distortion",
            "Healthy, vigorous plant growth rate and overall appearance",
        ],
        causes: [
            "Proper balanced nutrition and consistent, appropriate watering practices",
            "Sound cultural practices and field hygiene maintained throughout season",
            "Effective and timely pest and disease scouting and management",
        ],
        treatments: [
            "No treatment is needed — continue your current care program",
            "Maintain your existing watering and fertilization schedule",
            "Continue regular plant monitoring for early detection of any changes",
        ],
        prevention: [
            "Continue consistent crop rotation practices each growing season",
            "Maintain balanced, appropriate fertilization including N, P, K and micronutrients",
            "Monitor regularly for the earliest signs of stress, pests, or disease",
            "Keep the field free of plant debris and volunteer plants between seasons",
            "Ensure proper plant spacing and adequate ventilation at all times",
        ],
    },

    powdery_mildew: {
        name: "powdery_mildew",
        displayName: "Powdery Mildew",
        severity: "moderate",
        description:
            "Powdery mildew on tomatoes is caused by Leveillula taurica (and occasionally Oidium neolycopersici). It produces characteristic white powdery fungal growth, primarily on the lower leaf surface, leading to yellowing and defoliation.",
        symptoms: [
            "White to grayish powdery fungal coating on lower leaf surfaces",
            "Bright yellow irregular patches visible on upper leaf surfaces above affected areas",
            "Older, mature leaves are consistently affected before younger growth",
            "Progressive premature leaf drop and widespread defoliation",
            "Reduced fruit size and quality resulting from significant defoliation",
        ],
        causes: [
            "Leveillula taurica or Oidium neolycopersici fungal pathogens",
            "Warm, dry conditions (20–30°C) with moderate relative humidity",
            "Poor air circulation within the plant canopy",
            "Dense canopy creating shaded, stagnant air pockets around lower leaves",
            "Unlike most fungal diseases, does NOT require free water on leaf surfaces to spread",
        ],
        treatments: [
            "Apply sulfur-based fungicides — do NOT apply when temperatures exceed 32°C",
            "Use potassium bicarbonate or sodium bicarbonate spray solutions",
            "Apply systemic fungicides such as myclobutanil or trifloxystrobin",
            "Remove all severely infected leaves immediately to reduce spore pressure",
            "Apply neem oil as a widely available organic management alternative",
        ],
        prevention: [
            "Select resistant or tolerant tomato varieties for your growing conditions",
            "Ensure adequate plant spacing to allow good airflow throughout the field",
            "Prune lower and inner leaves regularly to improve canopy ventilation",
            "Avoid excessive nitrogen fertilization which promotes lush, susceptible growth",
            "Inspect lower leaf surfaces regularly during routine monitoring visits",
        ],
    },
};

/** Returns the severity level as a numeric score 0–3 */
export function getSeverityScore(severity: DiseaseInfo["severity"]): number {
    const map: Record<string, number> = { low: 0, moderate: 1, high: 2, critical: 3 };
    return map[severity] ?? 0;
}

/** Returns Tailwind-compatible color classes for severity badges */
export function getSeverityColor(severity: DiseaseInfo["severity"]): string {
    switch (severity) {
        case "low": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        case "moderate": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        case "high": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
        case "critical": return "bg-red-500/10 text-red-500 border-red-500/20";
        default: return "bg-muted text-muted-foreground border-border";
    }
}

/** Returns a human-readable label for a severity level */
export function getSeverityLabel(severity: DiseaseInfo["severity"]): string {
    switch (severity) {
        case "low": return "Healthy";
        case "moderate": return "Moderate Risk";
        case "high": return "High Risk";
        case "critical": return "Critical";
        default: return "Unknown";
    }
}

/** Returns the hex accent color for a severity level (for inline styles) */
export function getSeverityHex(severity: DiseaseInfo["severity"]): string {
    switch (severity) {
        case "low": return "#16a34a";
        case "moderate": return "#d97706";
        case "high": return "#ea580c";
        case "critical": return "#dc2626";
        default: return "#888880";
    }
}

/** Returns all diseases that share the same severity level */
export function getDiseasesBySeverity(severity: DiseaseInfo["severity"]): DiseaseInfo[] {
    return Object.values(DISEASE_DATABASE).filter(d => d.severity === severity);
}

/** Checks if a disease requires urgent action (high or critical) */
export function requiresUrgentAction(disease: DiseaseInfo): boolean {
    return disease.severity === "high" || disease.severity === "critical";
}