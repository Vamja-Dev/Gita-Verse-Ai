import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

class LLMService:
    def __init__(self):
        self.provider = os.getenv("LLM_PROVIDER", "local")
        self.gemini_api_key = os.getenv("GEMINI_API_KEY", "")
        
        if self.provider == "gemini" and self.gemini_api_key:
            self.client = genai.Client(api_key=self.gemini_api_key)

    def generate_connection(self, user_problem: str, primary_shloka: dict) -> str:
        sanskrit = primary_shloka.get('sanskrit', '')
        translation = primary_shloka.get('translations', {}).get('english', '')
        explanation = primary_shloka.get('explanations', {}).get('english', '')
        
        system_instructions = (
            "You are GitaVerse AI, a compassionate Bhagavad Gita-based spiritual guidance assistant. "
            "Your purpose is to help users reflect on their unique life situations through the provided Bhagavad Gita teaching. "
            "Rules:\n"
            "1. Never invent or fabricate a Gita shloka, chapter number, or verse number.\n"
            "2. Write a fresh, personalized, deep spiritual connection paragraph explaining explicitly why this specific retrieved verse helps resolve or bring perspective to the user's specific problem statement.\n"
            "3. Keep the tone warm, respectful, wise, and grounded."
        )
        
        user_prompt = (
            f"User's Life Situation: \"{user_problem}\"\n\n"
            f"Retrieved Gita Teaching (Chapter {primary_shloka.get('chapter')}, Verse {primary_shloka.get('shloka_number')}):\n"
            f"Sanskrit: {sanskrit}\n"
            f"Translation: {translation}\n"
            f"Explanation: {explanation}\n\n"
            "Write a unique spiritual connection explaining how this teaching addresses the user's situation."
        )

        if self.provider == "gemini" and self.gemini_api_key and self.gemini_api_key != "your_actual_gemini_api_key_here":
            try:
                response = self.client.models.generate_content(
                    model='gemini-3.5-flash',
                    contents=user_prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=system_instructions,
                        temperature=0.7
                    )
                )
                if response and response.text:
                    return response.text.strip()
            except Exception as e:
                print(f"Gemini API connection exception: {e}")

        # Fallback if API key is missing or request fails
        return (
            f"In your situation, this teaching from Chapter {primary_shloka.get('chapter')}, Verse {primary_shloka.get('shloka_number')} "
            f"reminds us to look inward: \"{translation[:120]}...\" — guiding you to anchor your mind in clarity."
        )