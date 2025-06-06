const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const {workExperienceTemplateTwo, educationTemplateTwo, projectsTemplateTwo, certificationsTemplateTwo} = require('./template_two_funcs');
const {workExperienceTemplateOne, educationTemplateOne, projectsTemplateOne, certificationsTemplateOne} = require('./template_one_funcs');



function writePersonalDetails(userDetails, htmlContent){
    //replaceAll placeholders with user details
    htmlContent = htmlContent.replaceAll("{{Name-Surname}}", userDetails.name + " " + userDetails.surname);
    htmlContent = htmlContent.replaceAll("{{Job Title}}", userDetails.role);

    if (userDetails.address){
        htmlContent = htmlContent.replaceAll("{{address}}", userDetails.address);
    }else{
        htmlContent = htmlContent.replaceAll("{{address}}", "none-display");
    }

    if (userDetails.email){
        htmlContent = htmlContent.replaceAll("{{email}}", userDetails.email);
    }else{
        htmlContent = htmlContent.replaceAll("{{email}}", "none-display");
    }

    if (userDetails.phone){
        htmlContent = htmlContent.replaceAll("{{phone}}", userDetails.phone);
    }else{
        htmlContent = htmlContent.replaceAll("{{phone}}", "none-display");
    }
    if (userDetails.linkedin){
        htmlContent = htmlContent.replaceAll("{{linkedin}}", userDetails.linkedin);
        htmlContent = htmlContent.replaceAll("{{linkedin-link}}", "https://www.linkedin.com/in/"+userDetails.linkedin);
    }else{
        htmlContent = htmlContent.replaceAll("{{linkedin}}", "none-display");
    }

    if (userDetails.github){
        htmlContent = htmlContent.replaceAll("{{github}}", userDetails.github);
        htmlContent = htmlContent.replaceAll("{{github-link}}", "https://www.github.com/"+userDetails.github);
    }else{
        htmlContent = htmlContent.replaceAll("{{github}}", "none-display");
    }

    if (userDetails.summary){
        htmlContent = htmlContent.replaceAll("{{summary}}", userDetails.summary);
    }else{
        htmlContent = htmlContent.replaceAll("{{summary-id}}", "none-display");
    }
    return htmlContent;
}


function generateHTMLContentTwo(template, userDetails){
    const templatePath = path.join(__dirname, "templates/templates", `${template}.html`);

    let htmlContent = fs.readFileSync(templatePath, "utf-8");

    // Write personal details
    htmlContent = writePersonalDetails(userDetails, htmlContent);

    if (userDetails.education){
        let educationHtml = "";
        for (let i = 0; i < userDetails.education.length; i++){
            educationHtml += educationTemplateTwo(userDetails);
        }
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Education}}", educationHtml);
    }else {
        htmlContent.replaceAll("{{education-none-display}}", "none-display");
    }

    if (userDetails.experience){
        console.log("Entered")
        let experienceHtml = workExperienceTemplateTwo(userDetails);
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Experience}}", experienceHtml);
    }else {
        htmlContent.replaceAll("{{experience-none-display}}", "none-display");
    }
    
    if (userDetails.technicalSkills){
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Skills}}", userDetails.technicalSkills.skill);
    }else {
        htmlContent.replaceAll("{{skills-none-display}}", "none-display");
    }

    if (userDetails.softSkills){
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Soft Skills}}", userDetails.softSkills.skill);
    }else {
        htmlContent.replaceAll("{{soft-skills-none-display}}", "none-display");
    }

    if (userDetails.project){
        let projectsHtml = projectsTemplateTwo(userDetails)
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Projects}}", projectsHtml);
    }else {
        htmlContent.replaceAll("{{projects-none-display}}", "none-display");
    }

    if (userDetails.certification){
        let certificationsHtml = certificationsTemplateTwo(userDetails) ;
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Certifications}}", certificationsHtml);
    }else {
        htmlContent.replaceAll("{{certifications-none-display}}", "none-display");
    }

    if (userDetails.achievements){
        let achievementsHtml = "";
        for (let i = 0; i < userDetails.achievements.length; i++){
            achievementsHtml += `
            <div>${userDetails.achievements[i].achievement}</div>`
        }
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Achievements}}", achievementsHtml);
    }else {
        htmlContent.replaceAll("{{achievements-none-display}}", "none-display");
    }
    
    if (userDetails.references){
        let referencesHtml = "";
        for (let i = 0; i < userDetails.references.length; i++){
            referencesHtml += `
            <div>${userDetails.references[i].reference}</div>`
        }
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of References}}", referencesHtml);
    }else {
        htmlContent.replaceAll("{{references-none-display}}", "none-display");
    }

    fs.writeFileSync(path.join(__dirname, "templates/output", `${userDetails.userId}-${template}.html`), htmlContent);
    return htmlContent;
}

function generateHTMLContentOne(userDetails){
    const templatePath = path.join(__dirname, "templates/templates", "template-one.html");
    let htmlContent = fs.readFileSync(templatePath, "utf-8");

    // Write personal details
    htmlContent = writePersonalDetails(userDetails, htmlContent);

    if (userDetails.education){
        let educationHtml = educationTemplateOne(userDetails);
        
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Education}}", educationHtml);
    }else {
        htmlContent = htmlContent.replaceAll("{{education}}", "none-display");
    }

    if (userDetails.experience){
        let experienceHtml = workExperienceTemplateOne(userDetails);
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Experience}}", experienceHtml);
    }else {
        htmlContent = htmlContent.replaceAll("{{experience}}", "none-display");
    }

    if (userDetails.technicalSkills.length > 0){
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Skills}}", userDetails.technicalSkills.skill);
    }else {
        htmlContent = htmlContent.replaceAll("{{tech-skills}}", "none-display");
    }

    if (userDetails.softSkills.length > 0){
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Soft Skills}}", userDetails.softSkills.skill);
    }else {
        htmlContent = htmlContent.replaceAll("{{soft-skills}}", "none-display");
    }

    if (userDetails.project){
        let projectsHtml = projectsTemplateOne(userDetails)
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Projects}}", projectsHtml);
    }else {
        htmlContent = htmlContent.replaceAll("{{projects}}", "none-display");
    }

    if (userDetails.certification){
        let certificationsHtml = certificationsTemplateOne(userDetails) ;
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Certifications}}", certificationsHtml);
    }else {
        htmlContent = htmlContent.replaceAll("{{certifications}}", "none-display");
    }

    if (userDetails.achievement.length > 0){
        let achievementsHtml = userDetails.achievement;
        htmlContent = htmlContent.replaceAll("{{Dynamic Listing Of Achievements}}", achievementsHtml);
    }else {
        htmlContent = htmlContent.replaceAll("{{achievements}}", "none-display");
    }

    fs.writeFileSync(path.join(__dirname, "templates/output", `${userDetails.userId}-template-one.html`), htmlContent);
    return htmlContent;
}

async function generateLocalPDF(htmlContent){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.addStyleTag({path: path.join(__dirname, "templates/styles", "template-two.css")});
    await page.pdf({path: "output.pdf"});
    await browser.close();
} 

/* async function generatePDF(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Inject the external CSS file
    await page.addStyleTag({ path: path.join(__dirname, "templates/styles", "template-two.css") });

    // Generate PDF buffer (do NOT write to file)
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    generateLocalPDF(htmlContent);
    return pdfBuffer;
} */

async function generatePDF(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Inject external CSS
    await page.addStyleTag({ path: path.join(__dirname, "templates/styles", "template-two.css") });

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Save to disk
    const outputPath = path.join(__dirname, 'resume.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);

    await browser.close();
    return pdfBuffer;
}


module.exports = {
    generateHTMLContentTwo,
    generateHTMLContentOne,
    generatePDF
}
