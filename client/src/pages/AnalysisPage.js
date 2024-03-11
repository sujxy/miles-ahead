import React from 'react'
import html2canvas from 'html2canvas' ;
import jsPDF from 'jspdf' ;
import { useRef } from 'react';
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
  return (
    <div>
      <div ref = {pdfRef}>AnalysisPage</div>
      <button onClick={pdfDownload}>Download pdf</button>
      </div>
  )
}

export default AnalysisPage