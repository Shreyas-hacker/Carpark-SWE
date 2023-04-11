import { createContext, useState } from 'react';

export const ReportContext = createContext({
    expenses: [],
    addReport: (report)=>{},
});


function ReportContextProvider({children}){
    const [reports, setReports] = useState([]);

    function addReport(report){
        setReports([...reports, report]);
    }

    const value = {
        reports: reports,
        addReport: addReport
    }

    return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
}

export default ReportContextProvider;