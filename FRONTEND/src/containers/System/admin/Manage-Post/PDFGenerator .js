import React from 'react';
import jsPDF from 'jspdf';
import { connect } from 'react-redux';
import 'jspdf-autotable';
class PDFGenerator extends React.Component {
  generatePDF = () => {
    const doc = new jsPDF();
    
    // Thiết lập font cho tài liệu PDF
    doc.setFont("Arial");
           doc.setFont("Arial");
    // Tạo nội dung cho tài liệu PDF
    const vietnameseText1 = "CONG HOA XA HOI CHU NGHIA VIET NAM";
    const vietnameseText2 = "Doc lap - Tu do - Hanh phuc";
    const vietnameseText3 = "____________________";
    const vietnameseText4 = "Danh sach hop le thang 4";

    // Tính toán chiều rộng của văn bản
    const textWidth1 = doc.getTextWidth(vietnameseText1);
    const textWidth2 = doc.getTextWidth(vietnameseText2);
    const textWidth3 = doc.getTextWidth(vietnameseText3);
    const textWidth4 = doc.getTextWidth(vietnameseText4);

    // Tính toán vị trí bắt đầu của văn bản sao cho nó nằm giữa theo chiều ngang
    const startX1 = (doc.internal.pageSize.width - textWidth1) / 2;
    const startX2 = (doc.internal.pageSize.width - textWidth2) / 2;
    const startX3 = (doc.internal.pageSize.width - textWidth3) / 2;
    const startX4 = (doc.internal.pageSize.width - textWidth4) / 2;

    // Tạo nội dung cho tài liệu PDF
    doc.text(vietnameseText1, startX1, 10);
    doc.text(vietnameseText2, startX2, 20);
    doc.text(vietnameseText3, startX3, 21);
    doc.text(vietnameseText4, startX4, 40);

      const tableData = [
        ['Column 1', 'Column 2', 'Column 3'],
        ['Row 1 Data 1', 'Row 1 Data 2', 'Row 1 Data 3'],
        ['Row 2 Data 1', 'Row 2 Data 2', 'Row 2 Data 3'],
        // Thêm dữ liệu bảng khác tại đây nếu cần
    ];
    doc.autoTable({
        startY: 55, // Vị trí bắt đầu của bảng
        head: [['Header 1', 'Header 2', 'Header 3']], // Header của bảng
        body: tableData // Dữ liệu của bảng
    });
    // Lưu file PDF
    doc.save('don-xin-phep-nghi-hoc.pdf');
  };

        
    render() {
      
    return (
        <div style={{
            textAlign: "right",
            margin: "20px 50px 10px 0"
      }}>
        <button className='btn btn-primary' /* onClick={this.generatePDF()} */>Tải file PDF</button>
      </div>
    );
  }
}

const mapStateToProps = state =>
{
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default connect( mapStateToProps, mapDispatchToProps )( PDFGenerator );
