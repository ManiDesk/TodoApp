import { createSlice } from "@reduxjs/toolkit";
import { collection, query, orderBy, onSnapshot, addDoc, where, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../../FireBase';
const user = auth.currentUser;
export const basicdetailsSlice = createSlice({
    name: 'basicdetails',
    initialState: {
        detailedItem: {
            name: '',
            email: '',
            altemail: '',
            mobile: '',
            altmobile: '',
            title: '',
            location: '',
            totalExperience: '',
            releventExperience: '',
            nationality: '',
            dateofbirth: '',
            address: '',
            aboutme: '',
            carreerobj: '',
            websiteurl: '',
            linkedinUrl: '',
            facebookUrl: '',
            instagramUrl: '',
            twitterUrl: '',
            githubUrl: '',
            otherUrl: '',
            country: '',
            state: '',
            pincode: ''
        }
    },
    reducers: {
        AddBasicDetails: (state, action) => {
            state.detailedItem = action.payload;
            try {
                if (user) {
                    addDoc(collection(db, "MLMnirresumebuilder" + user.uid), {
                        userid: user.uid,
                        basicdetails: state.detailedItem,
                    }).then(
                        console.log('red' + ' - ' + "Successfully Added"),
                        // reset()
                    ).catch(err => alert(err.message))
                }
                else {
                    console.log('user is not signed in to add todo to database');
                }


            } catch (err) {
                alert(err)
            }

        },
        EditBasicDetails: (state) => {
            state.value += 1
        },
        UpdateBasicDetails: (state) => {
            state.value += 1
        },
        DeleteBasicDetails: (state) => {
            state.value += 1
        },
        FetchBasicDetails: (state) => {
           
            const user = auth.currentUser;
            
            try {

                // if (user) {  
                      
                const resumeColRef = query(collection(db, 'MLMnirresumebuilder' + user.uid));
                let detailedItems;
                let detailedItems2=   onSnapshot(resumeColRef, (snapshot) => {
                detailedItems=   snapshot.docs.map(doc => {
                    const details = {
                        id: doc.id,
                  data: doc.data()
                    }
                    //console.log(details)
                    //return details
                  state = details
                  console.log( state)
                    })
                    console.log(detailedItems)
                  // return detailedItems
               
                
                // console.log( state.detailedItem)
                })
                state.detailedItem = detailedItems2();
              //  state.detailedItem = state
                //console.log(unsub)
            
            //    state.detailedItem = mani.detailedItems
                // }
                // else {
                //     console.log('user is not signed in to retrive username')
                // }

            } catch (err) {
                console.error(err);
                //alert("An error occured while fetching user data");
            }
        }
    }
})


export const { AddBasicDetails, EditBasicDetails, UpdateBasicDetails, DeleteBasicDetails, FetchBasicDetails } = basicdetailsSlice.actions;
export const userlist = (state) => state.basicdetails.detailedItem
export default basicdetailsSlice.reducer
