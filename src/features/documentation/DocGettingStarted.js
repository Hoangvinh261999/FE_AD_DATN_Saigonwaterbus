import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { setPageTitle, showNotification } from "../common/headerSlice"
import GettingStartedNav from "./components/GettingStartedNav"
import ReadMe from "./components/GettingStartedContent"
import GettingStartedContent from "./components/GettingStartedContent"



function GettingStarted(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Nhân Viên"}))
      }, [])


    return(
        <>
            <div className="bg-base-100  flex overflow-hidden  rounded-lg" style={{height : "82vh"}}>
                    <div className="grow pt-16  overflow-y-scroll">
                        <GettingStartedContent />
                    </div>
            </div>
        </>
    )
}

export default GettingStarted