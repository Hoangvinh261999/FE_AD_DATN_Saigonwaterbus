import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'

function ProfileSettings(){


    const dispatch = useDispatch()

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "Profile Updated", status : 1}))    
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
        <>
            
            <TitleCard title="Thông tin cá nhân" topMargin="mt-2">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Họ" defaultValue="Phạm" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Tên" defaultValue="Đức" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Email" defaultValue="alex@dashwind.com" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Username" defaultValue="alex" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Password" defaultValue="******" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Ngày tạo" defaultValue="2022-12-12" updateFormValue={updateFormValue}/>
                </div>
                <div className="divider" ></div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
            </TitleCard>
        </>
    )
}


export default ProfileSettings