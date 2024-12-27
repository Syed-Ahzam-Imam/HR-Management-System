import os
import time
import streamlit as st
from hugchat import hugchat
from hugchat.login import Login
from dotenv import load_dotenv
import requests

load_dotenv()


def generate_response(prompt):

    # if not st.session_state.messages:
    #     assistant = chatbot.search_assistant(assistant_name="ChatGpt")
    #     chatbot.new_conversation(assistant=assistant, switch_to=True)
    #     response = chatbot.chat(prompt)
    #     print(response)
    # else:
    try:
        response = requests.get("https://backendhr.sysartx.com/resume")
        print(response)
        response.raise_for_status()
        data = response.json()
        system_prompt = data.get("system_prompt", "")
    except Exception as e:
        st.error(f"Error fetching system prompt from API: {e}")
        system_prompt = ""
    try:
        # hugchat.ChatBot.new_conversation(assistant=assistant, switch_to=True)
        EMAIL = "CogniSoftlabs@gmail.com"
        PASSWD = "CogniSoftlabs@1234"
        cookie_path_dir = "./cookies/" # NOTE: trailing slash (/) is required to avoid errors
        sign = Login(os.getenv("EMAIL"), os.getenv("PASSWD"))
        cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)


        chatbot = hugchat.ChatBot(
          cookies=cookies.get_dict(),
            system_prompt="""
        You have a set of resumes stored in your system, and you need to extract a PDF link from them based on a specific input. Each resume is stored with a unique identifier and contains information about the candidate.
To proceed, please provide the input you're searching for in the resumes. If the input matches any of the resumes, I'll return the PDF link associated with that resume.
For example, if the input is a candidate's name, position, or any other identifiable information, I'll search through the resumes to find a match. If the input matches a resume, I'll return the PDF link to that resume.
Please provide the search input to begin the process. provide the pdf link and https://backendhr.sysartx.com/uploads/ behind every pdf link.
""" + response.text,
        )
        # response = chatbot.chat(text=prompt )

        response = chatbot.chat(
            prompt,
            temperature=0.2,
            # max_new_tokens=128,  # Experiment with different values
            # top_k=10,  # Experiment with different values
            # top_p=0.7,  # Experiment with different values
            # presence_penalty=0.0,  # Experiment with different values
            # frequency_penalty=0.0,  # Experiment with different values
            best_of=1,  # Experiment with different values
            stop=['.', '?', '!'],  # Experiment with different values
            # retry_count=10,  # Number of retries for network errors
            use_cache=True,  # Enable response caching
        )

    except hugchat.exceptions.ChatError as e:
        response = "Error: The chat service encountered an internal error. Please try again later."
        st.toast(f"Chat service error: {e}",icon = '⚠️')
    except Exception as e:
        response = "Error: Please try again"
        st.toast(f"An error occurred: {e}",icon = '⚠️')
    return response

st.set_page_config(
    page_title="Sysartx - Chatbot",
    page_icon="logo.png",
    layout="wide",
)
st.subheader("Find your perfect candidate")
# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []
    # initial_prompt =
    # generate_response(initial_prompt)

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Accept user input
if prompt := st.chat_input("Looking for the perfect candidate? Let me help you find the best resume!"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    # Display user message in chat message container
    with st.chat_message("user"):
        st.markdown(prompt)

    # Display assistant response in chat message container
    with st.spinner("Thinking..."):
        with st.chat_message("assistant"):
            response = generate_response(prompt)
            st.markdown(response)

    # Add assistant response to chat history
    st.session_state.messages.append({"role": "assistant", "content": response})
