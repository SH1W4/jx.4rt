/**
 * Google Apps Script para JX.4RT Intake
 * 
 * INSTRUÇÕES DE INSTALAÇÃO:
 * 1. Crie uma nova Google Sheet em https://sheets.google.com
 * 2. Vá em Extensões > Apps Script
 * 3. Copie este código para o editor
 * 4. Salve como "IntakeHandler"
 * 5. Vá em Implantar > Nova implantação
 * 6. Tipo: Aplicativo Web
 * 7. Quem tem acesso: Qualquer pessoa
 * 8. Copie a URL do aplicativo web
 * 9. Cole a URL em config.js como GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get or create the "Intake" sheet
    let intakeSheet = sheet.getSheetByName('Intake');
    if (!intakeSheet) {
      intakeSheet = sheet.insertSheet('Intake');
      
      // Set headers
      const headers = [
        'Timestamp',
        'Step 1: Idea',
        'Step 2: Body Area',
        'Step 2: Position X',
        'Step 2: Position Y',
        'Step 2: Scale Width (cm)',
        'Step 2: Scale Height (cm)',
        'Step 3: Language',
        'Step 4: References (count)',
        'Step 5: Body Photo (name)',
        'Step 6: Budget',
        'Step 7: Preferred Date',
        'Step 8: Name',
        'Step 8: Birthdate',
        'Step 8: City',
        'Step 8: WhatsApp',
        'Step 8: Instagram',
        'Step 8: Email',
        'Step 9: Allergies',
        'Step 9: Allergies Detail',
        'Step 9: Health Notes',
        'Step 10: Source',
        'Step 10: Why JX.4RT'
      ];
      intakeSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      intakeSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    
    // Prepare the row data
    const timestamp = new Date();
    const row = [
      timestamp,
      data.idea || '',
      data.bodyArea || '',
      data.positionX || '',
      data.positionY || '',
      data.scaleWidth || '',
      data.scaleHeight || '',
      data.language || '',
      data.referencesCount || '',
      data.bodyPhotoName || '',
      data.budget || '',
      data.preferredDate || '',
      data.name || '',
      data.birthdate || '',
      data.city || '',
      data.whatsapp || '',
      data.instagram || '',
      data.email || '',
      data.allergies || '',
      data.allergiesDetail || '',
      data.healthNotes || '',
      data.source || '',
      data.whyJx4rt || ''
    ];
    
    // Append the row
    intakeSheet.appendRow(row);
    
    // Format the timestamp column
    const lastRow = intakeSheet.getLastRow();
    intakeSheet.getRange(lastRow, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - run this from the Apps Script editor to test
 */
function testDoPost() {
  const testData = {
    idea: 'Test idea',
    bodyArea: 'Left Arm',
    positionX: 50,
    positionY: 30,
    scaleWidth: 15,
    scaleHeight: 10,
    language: 'blackwork',
    referencesCount: 2,
    bodyPhotoName: 'photo.jpg',
    budget: 'R$ 3000',
    preferredDate: '2024-12-01',
    name: 'Test User',
    birthdate: '1990-01-01',
    city: 'Salvador',
    whatsapp: '5571999999999',
    instagram: '@test',
    email: 'test@example.com',
    allergies: 'no',
    allergiesDetail: '',
    healthNotes: '',
    source: 'instagram',
    whyJx4rt: 'Like the style'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  doPost(mockEvent);
}
