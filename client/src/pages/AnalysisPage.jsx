import html2canvas from 'html2canvas' ;
import jsPDF from 'jspdf' ;
import { useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

import { Pie } from 'react-chartjs-2';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)
const AnalysisPage = () => {
  const pdfRef = useRef() ;

  // only png img is allow in pdf
  function pdfDownload(){
    const input = pdfRef.current ;
    html2canvas(input).then((canvas)=>{
      const imgData = canvas.toDataURL('image/png') ;
      const pdf = new jsPDF('p','mm','a4',true) ;
      const pdfWidth = pdf.internal.pageSize.getWidth() ;
      const pdfHeight = pdf.internal.pageSize.getHeight() ;
      const imgWidth = canvas.width ;
      const imgHeight = canvas.height ;
      const ratio = Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight) ;
      const imgX = (pdfWidth-imgWidth*ratio)/2 ;
      const imgY = 30 ;
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
      pdf.save("analysis.pdf") ;  
    }) 
  }

  const data = {
    labels:["one","two","three"],
    datasets:[
      {
        data:[3,6,9],
        backgroundColor:['aqua','red','yello']
      }
    ]
  } 

  const options = {

  }

  return (  
    <div>
      <div style={{
        maxWidth:"650px",
        padding:"20px",
        width:"50%"
      }} ref={pdfRef}>
        <Pie data={data} options={options}></Pie>
    </div>
      <button onClick={pdfDownload}>Download pdf</button>
    </div>
  )
};

export default AnalysisPage

// <div style={{ maxWidth: "650px" }}>
// <Bar
//   data={{
//     labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
//     datasets: [
//       {
//         label: "total count/value",
//         data: [1552, 1319, 613, 1400],
//         backgroundColor: ["aqua", "green", "red", "yellow"],
//         borderColor: ["aqua", "green", "red", "yellow"],
//         borderWidth: 0.5,
//       },
//     ],
//   }}
//   height={400}
//   options={{
//     maintainAspectRatio: false,
//     scales: {
//       yAxes: [
//         {
//          ticks: {
//             beginAtZero: true,
//          },
//         },
//       ],
//     },
//     legend: {
//       labels: {
//         fontSize: 15,
//       },
//     },
//   }}
// />
// </div>