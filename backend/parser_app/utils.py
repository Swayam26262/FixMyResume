# e:\Django Projects\FixMyResume\backend\parser_app\utils.py
import PyPDF2
import docx
import os

def parse_pdf(file_stream):
    """Parses a PDF file stream and returns its text content."""
    try:
        pdf_reader = PyPDF2.PdfReader(file_stream)
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text() or "" # Ensure None is handled
        return text
    except Exception as e:
        # Log the exception for debugging
        print(f"Error in parse_pdf: {e}") 
        return f"Error parsing PDF: {e}"

def parse_docx(file_stream):
    """Parses a DOCX file stream and returns its text content."""
    try:
        doc = docx.Document(file_stream)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + '\\n'
        return text
    except Exception as e:
        # Log the exception for debugging
        print(f"Error in parse_docx: {e}")
        return f"Error parsing DOCX: {e}"

def parse_resume_file(uploaded_file):
    """
    Determines file type from an uploaded file object,
    reads its stream, and calls the appropriate parser.
    """
    filename = uploaded_file.name
    _, file_extension = os.path.splitext(filename)

    # Ensure the file pointer is at the beginning if it has been read before
    uploaded_file.seek(0) 

    if file_extension.lower() == '.pdf':
        return parse_pdf(uploaded_file)
    elif file_extension.lower() == '.docx':
        return parse_docx(uploaded_file)
    else:
        return "Error: Unsupported file type. Please provide a .pdf or .docx file."
