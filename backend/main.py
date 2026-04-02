from ai_analyzer import analyze_resume_text
import pdfplumber
import docx
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message":"API working"}

def extract_pdf(file):

    text = ""

    with pdfplumber.open(file) as pdf:

        for page in pdf.pages:
            text += page.extract_text() or ""

    return text


def extract_docx(file):

    doc = docx.Document(file)

    text = ""

    for para in doc.paragraphs:
        text += para.text + "\n"

    return text

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):

    content = await file.read()

    # save temp file
    with open(file.filename,"wb") as f:
        f.write(content)

    # extract text
    if file.filename.endswith(".pdf"):

        text = extract_pdf(file.filename)

    elif file.filename.endswith(".docx"):

        text = extract_docx(file.filename)

    else:

        text = ""

    print(text[:500])

    # simple scoring logic
    result = analyze_resume_text(text)

    return result

import uvicorn

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)