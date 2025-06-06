function workExperienceTemplateTwo(jsonObject){
    let output = ''
    for (let i = 0; i < jsonObject.experience.length; i++){
        output += `
            <div class="res-two-item">
                <h4>${jsonObject.experience[i].workplace}</h4>
                <div style="margin-top: -10px">
                    <p style="margin-bottom: 0px">${jsonObject.experience[i].role}</p>
                    <p style="margin-top: 3px">${jsonObject.experience[i].startDate} - ${jsonObject.experience[i].endDate}</p>
                </div>
                <div style="margin-top: -5px">${jsonObject.experience[i].description}</div>
            </div>`
    }
    return output
}

function educationTemplateTwo(jsonObject){
    let output ='';
    for (let i = 0; i < jsonObject.education.length; i++){
        output += `
            <div class="res-two-item">
                <h4>${jsonObject.education[i].institution}</h4>
                <div style="margin-top: -8px">
                    <p style="margin-bottom: 0px">${jsonObject.education[i].level} in ${jsonObject.education[i].field}</p>
                    <p>${jsonObject.education[i].start_date} - ${jsonObject.education[i].end_date}</p>
                </div>
            </div>`
    }
    return output;
}

function projectsTemplateTwo(jsonObject){
    let output = ''
    for(let i = 0; i < jsonObject.project.length; i++){
        output +=  `
            <div class="res-two-item">
                <h4>${jsonObject.project[i].project} | <a href="${jsonObject.project[i].link}" target="_blank"  rel="noopener noreferrer">LINK</a></h4>
                <div>${jsonObject.project[i].description}</div>
            </div>`
    }
    return output;
}

function certificationsTemplateTwo(jsonObject){
    let output = ''
    for(let i = 0; i < jsonObject.certification.length; i++){
        output += `
            <div class="res-two-item">
                <span>
                    <p><strong>${jsonObject.certification[i].provider} </strong> | ${jsonObject.certification[i].title}</p>
                </span>
                <p style="margin-top: -6px">${jsonObject.certification[i].date}</p>
            </div>`
    }
    return output
}

module.exports = {
    workExperienceTemplateTwo,
    educationTemplateTwo,
    projectsTemplateTwo,
    certificationsTemplateTwo
}