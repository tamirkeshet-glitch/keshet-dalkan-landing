/**
 * טופס לידים לדף הנחיתה של דלקן.
 * להריץ פעם אחת מתוך Apps Script המחובר לחשבון doc sonol / תמיר:
 *   buildDalkanLeadForm()
 * הפלט ב-Logger: כתובת עריכה, formResponse, ומזהי entry לחיבור הדף.
 * לא מחובר לטופס ההזמנות או ל-JOIN.
 */
function buildDalkanLeadForm() {
  var form = FormApp.create('לידים דף נחיתה דלקן — קשת יזמות עסקית / סונול');
  form.setDescription('פניות מדף הגיוס. לא הסכם ולא הזמנה. נחזור לטלפון שהושאר.');
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('קיבלנו את הפרטים. נחזור אליכם.');

  var name = form.addTextItem().setTitle('שם מלא').setRequired(true);
  var phone = form.addTextItem().setTitle('טלפון').setRequired(true);
  var email = form.addTextItem().setTitle('אימייל').setRequired(false);
  var city = form.addTextItem().setTitle('יישוב').setRequired(false);
  var audience = form.addMultipleChoiceItem()
    .setTitle('למי זה')
    .setRequired(true)
    .setChoiceValues(['עסק', 'משפחה', 'גם וגם']);
  var org = form.addTextItem().setTitle('שם העסק או המשפחה').setRequired(false);
  var cars = form.addMultipleChoiceItem()
    .setTitle('כמה רכבים בערך')
    .setRequired(false)
    .setChoiceValues(['1', '2–3', '4–10', 'יותר מ-10']);
  var interest = form.addCheckboxItem()
    .setTitle('מה מעניין')
    .setRequired(false)
    .setChoiceValues(['דלקן רכב', 'כרטיס נהג', 'מאסטר', 'סונוקאש', 'שטיפומט']);
  var note = form.addParagraphTextItem().setTitle('הערה').setRequired(false);

  var sheet = SpreadsheetApp.create('לידים דף נחיתה דלקן — תגובות');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  var ids = {
    name: name.getId(),
    phone: phone.getId(),
    email: email.getId(),
    city: city.getId(),
    audience: audience.getId(),
    org: org.getId(),
    cars: cars.getId(),
    interest: interest.getId(),
    note: note.getId()
  };
  Logger.log(JSON.stringify({
    editUrl: form.getEditUrl(),
    publishedUrl: form.getPublishedUrl(),
    formResponse: form.getPublishedUrl().replace(/\/viewform.*$/, '/formResponse'),
    formId: form.getId(),
    sheetId: sheet.getId(),
    sheetUrl: sheet.getUrl(),
    entry: ids
  }, null, 2));
  return ids;
}
