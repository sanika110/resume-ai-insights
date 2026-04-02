import google.generativeai as genai
import google.generativeai as genai

genai.configure(api_key="AIzaSyBmP_aBS4MMzrjuG41nECT11YEEjreDRYw")

model = genai.GenerativeModel("gemini-1.5-flash")

def get_ai_suggestions(text):

    prompt = f"""
    Analyze this resume and give 5 short professional improvement suggestions.

    Resume:
    {text[:1200]}

    Return only bullet points.
    """

    try:

       response = model.generate_content(

    prompt,

    request_options={"timeout":8},

    generation_config={
        "max_output_tokens":150,
        "temperature":0.3
    }
    )

        if hasattr(response,"text") and response.text:

            lines = response.text.split("\n")

            clean = []

            for line in lines:

                line = line.replace("*","").replace("-","").strip()

                if len(line) > 5:
                    clean.append(line)

            if len(clean)==0:

                return [
                "Add measurable achievements",
                "Improve professional summary",
                "Add certifications",
                "Add project impact",
                "Improve formatting"
                ]

            return clean[:5]

        return ["Improve formatting","Add measurable achievements"]

    except Exception as e:

        print(e)

        return ["AI suggestions unavailable"]