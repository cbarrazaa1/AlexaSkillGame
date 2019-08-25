// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const questions = require('./questions');

const https = require('https');

https.get('https://herokutriviahackmty.herokuapp.com/api/questions/', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}  

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = '<emphasis level = "reduced"> ¡Hola! </emphasis> Bienvenido a la Aventura de la Sabiduría. Di empezar para iniciar tu viaje';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: require('./mainMenuAPL.json'),
                datasources: {}
            })
            .getResponse();
    }
};

const StartHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope
        
        if (handlerInput.attributesManager.getSessionAttributes().gameOver) {
            return false;
        }
        return (request.type === 'IntentRequest'
        &&  request.intent.name === 'StartIntent') 
        && !handlerInput.attributesManager.getSessionAttributes().started;
    },
    handle(handlerInput) {
        const question = questions[0];
        let speakOutput = question.text;
        let x, y;
        do {
            x = randomNumber(10, 20);
            y = randomNumber(2, 5);
        } while (x % y !== 0)
        
        handlerInput.attributesManager.setSessionAttributes({
            started: true,
            questionIndex: 0,
            params: {
                x: x,
                y: y,
            },
            hp: 5,
        })
        
        speakOutput = speakOutput.replace('${x}', x.toString());
        speakOutput = speakOutput.replace('${y}', y.toString());
        
        const variables = `X = ${x}<br>Y = ${y}<br><br>Contesta correctamente para continuar tu aventura.`
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: require('./questionAPL.json'),
                datasources: {
                    "docdata": {
                        "uri": "http://1.bp.blogspot.com/-3qvt8UXU4c8/UUtMz3RarlI/AAAAAAAABUs/bXnzXVgPLqI/s1600/Background02.jpg",
                        "variables": variables,
                    }
                }
            })
            .getResponse();
    }
};

const RestartHandler = {
    canHandle(handlerInput) {
        const {request} = handlerInput.requestEnvelope
        return (request.type === 'IntentRequest'
        &&  request.intent.name === 'RestartIntent' && handlerInput.attributesManager.getSessionAttributes().hp <= 0);
    },
    handle(handlerInput) {
        const question = questions[0];
        let speakOutput = question.text;
        let x, y;
        do {
            x = randomNumber(10, 20);
            y = randomNumber(2, 5);
        } while (x % y !== 0)
            
        handlerInput.attributesManager.setSessionAttributes({
            started: true,
            gameOver: false,
            questionIndex: 0,
            params: {
                x: x,
                y: y,
            },
            hp: 5,
        })
        speakOutput = speakOutput.replace('${x}', x.toString());
        speakOutput = speakOutput.replace('${y}', y.toString());
        
        const variables = `X = ${x}<br>Y = ${y}<br><br>Contesta correctamente para continuar tu aventura.`
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: require('./questionAPL.json'),
                datasources: {
                    "docdata": {
                        "uri": "http://1.bp.blogspot.com/-3qvt8UXU4c8/UUtMz3RarlI/AAAAAAAABUs/bXnzXVgPLqI/s1600/Background02.jpg",
                        "variables": variables,
                    }
                }
            })
            .getResponse();
    }
};




const RespuestaDirectaHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope
        
        if (handlerInput.attributesManager.getSessionAttributes().gameOver) {
            return false;
        }
        
        return (request.type === 'IntentRequest'
        &&  request.intent.name === 'RespuestaDirectaIntent') 
        && handlerInput.attributesManager.getSessionAttributes().started;
    },
    handle(handlerInput) {
        console.log("Hello handler");
        const { request } = handlerInput.requestEnvelope;
        let attr = handlerInput.attributesManager.getSessionAttributes();
        const index = attr.questionIndex;
        const xx = attr.params.x;
        const yy = attr.params.y;
        const ans = parseInt(request.intent.slots.ans.value);
        let isCorrect = false;
        
        // DIRECTAS COMP
        switch (index) {
            case 0: 
                isCorrect = (ans === xx / yy)
                break;
            case 1:
                isCorrect = (ans === xx / yy)
                break;
            case 5:
                if(xx - yy === ans) {
                    isCorrect = true
                }
                else {
                    isCorrect = false
                }
                break;
            case 6:
                if (ans === (4 * xx) / yy) {
                    isCorrect = true
                }
                else {
                    isCorrect = false
                }
                break;
            case 7:
                if (xx * yy === ans) {
                    isCorrect = true
                }
                else {
                    isCorrect = false
                }
                break;
            case 8:
                if(ans === xx + yy) {
                    isCorrect = true
                }
                else {
                    isCorrect = false
                }
                break;
            case 9:
                if (ans === xx * yy) {
                    isCorrect = true
                }
                else {
                    isCorrect = false
                }
                break;
            case 10:
                if (ans === xx * yy) {
                    isCorrect = true
                }
                else {
                    isCorrect = false
                }
                break;
        }
        
        let speakOutput;
        if (isCorrect) {
            speakOutput = questions[index].correct;    
        } else {
            speakOutput = questions[index].wrong;
            attr.hp -= 1;
        }
        
        handlerInput.attributesManager.setSessionAttributes(attr);
        
        ////// VAN TODAS
        let newIndex;
        do {
            newIndex = randomNumber(1, questions.length - 1);
        } while(newIndex === index)
        const question = questions[newIndex];
        let params;
        let x, y;
        switch (newIndex) {
           case 1: 
                do {
                    x = randomNumber(20, 50);
                    y = randomNumber(2, 10);
                } while (x % y !== 0)
                params = {
                    x: x,
                    y: y,
                }
                speakOutput += '. ' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 2:
                y = randomNumber(2, 8);
                x = randomNumber(y + 1, 15);
                params = {
                    x: x,
                    y: y,
                }
                speakOutput += '. ' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 3: 
                do {
                    x = randomNumber(1, 10);
                    y = randomNumber(8, 42);
                } while (x * 4 === y)
                params = {
                    x: x,
                    y: y,
                };
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 4:
                x = randomNumber(3,10);
                y = randomNumber(11,100);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 5:
                x = randomNumber(60,100);
                y = randomNumber(10,59);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace ('${y}', y.toString());
                break;
            case 6:
                do {
                    x = randomNumber(4,16);
                    y = randomNumber(1,5);
                } while ((x * 4) % y !== 0);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());    
                break;
            case 7:
                do {
                    x = randomNumber(2,20);
                    y = randomNumber(2,10)
                } while (x % y !== 0)
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 8:
                x = randomNumber(50,100);
                y = randomNumber(30,60);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 9:
                x = randomNumber(2,5);
                y  = randomNumber(5,14);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 10:
                x = randomNumber(5,10);
                y  = randomNumber(6,12);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
        }
        
        if (attr.hp <= 0) {
            attr.gameOver = true;
            speakOutput = "Game over. Di continuar para jugar de nuevo.";
        }
        
        attr = Object.assign(attr, {
            questionIndex: newIndex,
            type: question.type,
            params: params,
        });
        ////////
        
        let variables = `X = ${x}`;
        if (y) {
            variables += `<br>Y = ${y}`;
        }
        variables += '<br><br>Contesta correctamente para continuar tu aventura.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: require('./questionAPL.json'),
                datasources: {
                    "docdata": {
                        "uri": "https://media.moddb.com/images/articles/1/133/132928/auto/EEzICUb.png",
                        "variables": attr.hp > 0 ? variables : 'Game Over',
                    }
                }
            })
            .getResponse();
    }
}

const RespuestaSiNoHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope
        const attr = handlerInput.attributesManager.getSessionAttributes();
        if (!attr.started || attr.gameOver) {
            return false;
        }
        
        return (request.type === 'IntentRequest'
        &&  request.intent.name === 'RespuestaSiNoIntent');
    },
    handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        let attr = handlerInput.attributesManager.getSessionAttributes();
        const index = attr.questionIndex;
        const xx = attr.params.x;
        const yy = attr.params.y;
        const ans = request.intent.slots.yesnoans.value;
        let isCorrect = false;
        let speakOutput;
        
        // SINO COMP
        switch (index) {
            case 2:
                if ((xx * 3) / 4 > yy) {
                    if (ans === 'si') {
                        speakOutput = questions[index].correct[0];
                    } else {
                        speakOutput = questions[index].wrong[0];
                        attr.hp -= 1;
                    }
                } else {
                    if (ans === 'si') {
                        speakOutput = questions[index].wrong[1];
                        attr.hp -= 1;
                    } else {
                        speakOutput = questions[index].correct[1];
                    }
                }
                break;
            case 3:
                if (xx * 4 > yy) {
                    if (ans === 'si') {
                        speakOutput = questions[index].correct[0];
                    } else {
                        speakOutput = questions[index].wrong[0];
                        attr.hp -= 1;
                    }
                } else {
                    if (ans === 'si') {
                        speakOutput = questions[index].wrong[1];
                        attr.hp -= 1;
                    } else {
                        speakOutput = questions[index].correct[1];
                    }
                }
                break;
            case 4:
                if (yy + 10 > xx * 10) {
                    if (ans === 'si') {
                        speakOutput = questions[index].correct;
                    } else {
                        speakOutput = questions[index].wrong;
                        attr.hp -= 1;
                    }
                } else {
                    if (ans === 'si') {
                        speakOutput = questions[index].wrong;
                        attr.hp -= 1;
                    } else {
                        speakOutput = questions[index].correct;
                    }
                }
                break;
        }
        
        handlerInput.attributesManager.setSessionAttributes(attr);
        
        ////// VAN TODAS
        let newIndex;
        do {
            newIndex = randomNumber(1, questions.length - 1);
        } while(newIndex === index)
        const question = questions[newIndex];
        let params;
        let x, y;
        switch (newIndex) {
           case 1: 
                do {
                    x = randomNumber(20, 50);
                    y = randomNumber(2, 10);
                } while (x % y !== 0)
                params = {
                    x: x,
                    y: y,
                }
                speakOutput += '. ' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 2:
                y = randomNumber(2, 8);
                x = randomNumber(y + 1, 15);
                params = {
                    x: x,
                    y: y,
                }
                speakOutput += '. ' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 3: 
                do {
                    x = randomNumber(1, 10);
                    y = randomNumber(8, 42);
                } while (x * 4 === y)
                params = {
                    x: x,
                    y: y,
                };
                speakOutput += '. ' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 4:
                x = randomNumber(1,100);
                y = randomNumber(1,100);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 5:
                x = randomNumber(1,100);
                y = randomNumber(1,100);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace ('${y}', y.toString());
                break;
            case 6:
                do {
                    x = randomNumber(1,80);
                    y = randomNumber(1,80);
                } while ((x * 4) % y !== 0);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());    
                break;
            case 7:
                do {
                    x = randomNumber(2,80);
                    y = randomNumber(2,80)
                } while (x % y !== 0)
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 8:
                x = randomNumber(1,100);
                y = randomNumber(1,100);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 9:
                x = randomNumber(2,25);
                y  = randomNumber(2,8);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
            case 10:
                x = randomNumber(5,10);
                y  = randomNumber(6,12);
                params = {
                    x: x,
                    y: y
                }
                speakOutput += '.' + question.text;
                speakOutput = speakOutput.replace('${x}', x.toString());
                speakOutput = speakOutput.replace('${y}', y.toString());
                break;
        }
        
        if (attr.hp <= 0) {
            attr.gameOver = true;
            speakOutput = "Game over. Di continuar para jugar de nuevo..";
        }
        
        attr = Object.assign(attr, {
            questionIndex: newIndex,
            type: question.type,
            params: params,
        });
        ////////
        let variables = `X = ${x}`;
        if (y) {
            variables += `<br>Y = ${y}`;
        }
        variables += '<br><br>Contesta si o no para continuar tu aventura.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: require('./questionAPL.json'),
                datasources: {
                    "docdata": {
                        "uri": "https://media.moddb.com/images/articles/1/133/132928/auto/EEzICUb.png",
                        "variables": attr.hp > 0 ? variables : 'Game Over',
                    }
                }
            })
            .getResponse();
    }
}

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hubo en error. Intente de nuevo, mejor suerte la próxima.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = error;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StartHandler,
        RestartHandler,
        RespuestaDirectaHandler,
        RespuestaSiNoHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
