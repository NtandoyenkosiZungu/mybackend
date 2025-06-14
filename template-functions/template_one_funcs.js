


function workExperienceTemplateOne(jsonObject){
    let output = '';
    for(let i = 0; i < jsonObject.experience.length; i++){
        output +=`<div class="content">
                <div class="left">
                    <b>
                        <span>${jsonObject.experience[i].workplace}</span><br>
                    </b>
                    <span>${jsonObject.experience[i].role}</span>
                </div>
                <div class="right">
                    <span>
                        ${jsonObject.experience[i].startDate} - ${jsonObject.experience[i].endDate}
                    </span>
                </div>
            </div>
            <div class="description">
                ${jsonObject.experience[i].description}
            </div>`
    }
    return output;
}

function educationTemplateOne(jsonObject){
    let output = '';
    for(let i = 0; i < jsonObject.education.length; i++){
        output += `<div class="content" id="{{education}}">
                <div class="left">
                    <span>
                        <b>${jsonObject.education[i].institution}</b>
                    </span> <br>
                    <span>${jsonObject.education[i].level} in ${jsonObject.education[i].field}</span>
                </div>
                <div class="right">
                    <span>
                    ${jsonObject.education[i].location}
                    </span>
                    <br>
                    <span>
                        ${jsonObject.education[i].start_date} - ${jsonObject.education[i].end_date}
                    </span>
                </div>
            </div>`
    }
    return output;
}

function projectsTemplateOne(jsonObject){
    let output = '';
    for(let i = 0; i < jsonObject.project.length; i++){
        output +=`<div class="content">
            <div class="left">
                <b>
                    ${jsonObject.project[i].project}| <a href="${jsonObject.project[i].link}" style="color: blue;" target="_blank" rel="noopener noreferrer">LINK</a>
                </b>
            </div>
            </div>
            <div class="description">
                ${jsonObject.project[i].description}
            </div>

            <div class="tools">
               <span><b>Tools:</b></span> ${jsonObject.project[i].tools.map(tool => `<span>${tool}</span>`).join(' | ')}
            </div>`
    }
    return output;
}

function certificationsTemplateOne(jsonObject){
    let output = '';
    for(let i = 0; i < jsonObject.certification.length; i++){
        output += `
            <div class="content">
                <div class="left"> 
                    <span>
                        <b> ${jsonObject.certification[i].provider} | ${jsonObject.certification[i].title} </b>
                    </span>
                </div>
                <div class="right">
                    <span>
                        ${jsonObject.certification[i].date}
                    </span>
                </div>
            </div>`
    }
    return output;
}


module.exports = {
    workExperienceTemplateOne,
    educationTemplateOne,
    projectsTemplateOne,
    certificationsTemplateOne
}