import streamlit as st
import pickle
import numpy as np

model = pickle.load(open('model2.pkl', 'rb'))


def predict_forest(Medicine,Dosage,Location):
    input = np.array([[Medicine, Dosage, Location]]).astype(np.float64)
    prediction = model.predict_proba(input)
    pred = '{0:.{1}f}'.format(prediction[0][0], 2)
    return float(pred)


def main():
    st.title("Medicine Availability")
    html_temp = """
    <div style="background-color:#025246 ;padding:10px">
        <h2 style="color:white;text-align:center;">Medicine Avaibility Prediction ML App</h2>
    </div>
    """
    st.markdown(html_temp, unsafe_allow_html=True)

    medicine_options = ["1. Amlodipine", "2. Diltiazem", "3. Alendronate","4. Risedronate","5. Minocycline","6. Accutane","7. Ibuprofen","8. Crocine","9. Activella","10. Addyi"]
    medicine_serial_number = st.selectbox("Medicine", medicine_options)

    # Extract serial number from the selected option
    medicine= medicine_serial_number.split(".")[0].strip()

    dosage_options = ["1. Tablet", "2. Liquid", "3. Capsule"]
    dosage_serial_number = st.selectbox("Dosage", dosage_options)
    dosage = dosage_serial_number.split(".")[0].strip()
    location_options = ["1. Bangalore", "2. Chennai", "3. Kanpur","4. Hyderabad","5. Delhi","6. Ahmedabad","7. Pune","8. Mumbai"]
    location_serial_number = st.selectbox("Location", location_options)

    # Extract serial number from the selected option
    location = location_serial_number.split(".")[0].strip()

    safe_html = """  
      <div style="background-color:#F4D03F;padding:10px >
        <h2 style="color:white;text-align:center;"> The Medicine is Not Available</h2>
      </div>
    """
    danger_html = """  
      <div style="background-color:#F08080;padding:10px >
        <h2 style="color:black;text-align:center;"> The Medicines is Available</h2>
      </div>
    """

    legend_html = """
    <div style="padding:10px;text-align:center;">
        <p style="font-size:16px;color:#2E86C1;">Legend:</p>
        <p style="font-size:14px;color:#F4D03F;">Not Available (Probability < 0.4)</p>
        <p style="font-size:14px;color:#F08080;">Available (Probability >= 0.4)</p>
    </div>
    """

    if st.button("Predict"):
        output = predict_forest(medicine,dosage, location)
        st.success('The probability of medicine availability is {}'.format(output))

        if output > 0.4:
            st.markdown(danger_html, unsafe_allow_html=True)
        else:
            st.markdown(safe_html, unsafe_allow_html=True)

        st.markdown(legend_html, unsafe_allow_html=True)


if __name__ == '__main__':
    main()
