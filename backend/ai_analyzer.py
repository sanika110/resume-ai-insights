import re

# basic skill database (we will expand later)
SKILLS = [

"python","java","c","c++","javascript","typescript",
"react","nextjs","node","express","fastapi","django","flask",

"machine learning","deep learning","nlp","computer vision",
"data science","data analysis","pandas","numpy","matplotlib",

"tensorflow","pytorch","scikit learn",

"sql","mysql","postgresql","mongodb","firebase",

"html","css","tailwind","bootstrap",

"git","github","docker","kubernetes","aws","azure","gcp",

"rest api","graphql","microservices",

"linux","bash","system design",

"figma","ui ux",

"agile","scrum"

]

JOB_ROLES = {

"software engineer":[
"python","java","c++","git","docker","system design","rest api"
],

"data scientist":[
"python","machine learning","pandas","numpy","sql",
"tensorflow","data analysis","statistics"
],

"web developer":[
"html","css","javascript","react","node",
"mongodb","rest api","typescript"
],

"aiml engineer":[
"python","machine learning","deep learning",
"nlp","tensorflow","pytorch","data science"
]

}

def clean_text(text):

    text = text.lower()

    text = re.sub(r'[^\w\s]', '', text)

    return text


def extract_skills(text):

    found = []

    for skill in SKILLS:

        if skill in text:

            found.append(skill)

    return found

def role_match_analysis(skills):

    role_scores = {}

    for role in JOB_ROLES:

        required = JOB_ROLES[role]

        match = 0

        for skill in required:

            if skill in skills:

                match += 1

        percent = int((match/len(required))*100)

        role_scores[role] = percent

    return role_scores

def role_missing_skills(skills):

    role_missing = {}

    for role in JOB_ROLES:

        missing = []

        for skill in JOB_ROLES[role]:

            if skill not in skills:

                missing.append(skill)

        role_missing[role] = missing

    return role_missing

def calculate_score(text, skills):

    score = 0

    # Skill score (30 max)
    skill_score = min(len(skills) * 2,30)
    score += skill_score

    # Section score
    if "skills" in text:
        score += 5

    if "project" in text:
        score += 10

    if "experience" in text:
        score += 10

    if "education" in text:
        score += 10

    # Bonus keywords
    if "internship" in text:
        score += 5

    if "certification" in text:
        score += 5

    # Base score
    score += 20

    if score > 100:
        score = 100

    return score

def analyze_resume_text(text):

    text = clean_text(text)

    skills = extract_skills(text)
    
    try:
      ai_tips = get_ai_suggestions(text)
    except Exception as e:
        
        ai_tips = [
            "Add measurable achievements",
            "Improve summary section",
            "Add certifications",
            "Add GitHub links",
            "Improve project descriptions"
        ]

    role_scores = role_match_analysis(skills)

    role_missing = role_missing_skills(skills)

    score = calculate_score(text,skills)

    strengths = []

    weaknesses = []

    suggestions = []

    if len(skills) > 8:

        strengths.append("Good technical skill presence")

    else:

        weaknesses.append("Low skill keywords")

        suggestions.append("Add more technical skills")

    if "project" in text:

        strengths.append("Projects section detected")

    else:

        weaknesses.append("Projects missing")

        suggestions.append("Add projects section")

    if "experience" in text:

        strengths.append("Experience present")

    else:

        suggestions.append("Add experience section")

    missing = [

    "docker",
    "aws",
    "system design",
    "kubernetes"

    ]

    missing_skills = []

    for skill in missing:

        if skill not in skills:

            missing_skills.append(skill)

    return {

        "score":score,

        "strengths":strengths,

        "weaknesses":weaknesses,

        "suggestions":suggestions,

        "missing_skills":missing_skills,

        "job_match":role_scores,

        "role_missing_skills":role_missing,
        "ai_suggestions":ai_tips,

        "sections":[

            {"name":"Skills","present":"skills" in text},

            {"name":"Projects","present":"project" in text},

            {"name":"Experience","present":"experience" in text},

            {"name":"Education","present":"education" in text}

        ]

    }