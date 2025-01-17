import streamlit as st
import pickle
import numpy as np
import pandas as pd

# Load the ML model
model = pickle.load(open('model1.pkl', 'rb'))

# Load the dataset
data = pd.read_csv('DoctorDataSet.csv')

# Clean and preprocess the 'Date' column
data['Date'] = data['Date'].str.strip()  # Remove extra spaces
data['Date'] = pd.to_datetime(data['Date'], format='%d/%m/%Y')  # Convert to datetime

# Prediction function
def predict_forest(Specialization, AppointmentHistory, Location):
    # Convert inputs into a numpy array for prediction
    input = np.array([[Specialization, AppointmentHistory, Location]]).astype(np.float64)
    prediction = model.predict_proba(input)
    pred = '{0:.{1}f}'.format(prediction[0][0], 2)
    return float(pred)

# Main function
def main():
    st.set_page_config(page_title="Doctor Availability Predictor", page_icon=":hospital:", layout="centered")

    # App title
    st.title("Doctor Availability Predictor :hospital:")

    # Step 1: Choose the specialization
    st.markdown("""
    ### Choose the Type of Doctor
    Select the type of doctor you are looking for from the options below.
    """)
    specialization_options = ["Cardiologist", "Orthopedic", "Dermatologist", "Gynecologist", "Pediatrics"]
    selected_specialization = st.selectbox("Select Specialization", specialization_options)

    # Step 2: Enter or Select Appointments
    st.markdown("""
    ### Enter Appointments
    Specify the number of appointments (Patient Load) scheduled for the doctor.
    """)
    appointment = st.number_input("Number of Appointments", min_value=0, max_value=100, value=0, step=1)

    # Step 3: Choose Location
    st.markdown("""
    ###  Choose the Location
    Select the location where you are checking the availability of the doctor.
    """)
    location_options = ["Bangalore", "Chennai", "Kanpur"]
    selected_location = st.selectbox("Select Location", location_options)

    # Step 4: Prediction
    st.markdown("""
    ###  Get Availability Prediction
    Click the button below to check the doctor's availability.
    """)

    if st.button("Predict Availability"):
        # Encode inputs for prediction
        specialization_encoded = specialization_options.index(selected_specialization) + 1
        location_encoded = location_options.index(selected_location) + 1

        # Perform prediction
        output = predict_forest(specialization_encoded, appointment, location_encoded)

        # Display results
        st.write(f"**Probability of doctor availability**: {output}")
        if output > 0.5:
            st.success(f"The doctor is likely to be **Available**. (Probability: {output})")
        else:
            st.error(f"The doctor is likely to be **Not Available**. (Probability: {output})")

    # # Footer
    # st.markdown("""
    # <div style="padding: 10px; text-align: center;">
    #     <p style="font-size:14px;color:gray;">Created with ❤️ by your team</p>
    # </div>
    # """, unsafe_allow_html=True)

if __name__ == '__main__':
    main()
