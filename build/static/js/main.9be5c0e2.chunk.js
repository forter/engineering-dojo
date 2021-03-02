(this.webpackJsonpdojo=this.webpackJsonpdojo||[]).push([[0],{33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var s=n(1),r=n.n(s),o=n(16),i=n.n(o),a=(n(33),n(34),n(35),n(9)),c=n(0);function u(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h1",{children:"We all want to get better, right?"}),Object(c.jsx)("h2",{children:'But "getting better" is so subjective. How can one even know or tell others what better is? '}),Object(c.jsx)("h2",{children:" Instead, we tried to be helpful "}),Object(c.jsx)("h2",{children:"We\u2019ll share with you ideas, concepts, frameworks and resources that can help you level up as a Software Engineer. "}),Object(c.jsxs)("div",{className:"call-to-action",children:[Object(c.jsx)(a.b,{to:"/questionnaire",children:Object(c.jsx)("button",{children:" I\u2019m ready, show me "})}),Object(c.jsx)("label",{children:"all free, no emails, no BS. We\u2019re Engineers."})]}),Object(c.jsx)("h2",{children:" From the creators of other fun things "}),Object(c.jsxs)("div",{className:"card-group",children:[Object(c.jsx)("div",{className:"card",children:" softwareArchitectureAddict.com "}),Object(c.jsx)("div",{className:"card",children:" Forker video "}),Object(c.jsx)("div",{className:"card",children:" Chuckwho.com "})]})]})}var l=n(10),d=n(19),h=n(25),j=n(26),p=n(11),b=n(28),f=n(27),O=[{question:"What franchise would you rather play a game from?",answers:[{type:"Microsoft",content:"Halo"},{type:"Nintendo",content:"Pokemon"},{type:"Sony",content:"Uncharted"}]},{question:"Which console would you prefer to play with friends?",answers:[{type:"Microsoft",content:"X-Box"},{type:"Nintendo",content:"Nintendo 64"},{type:"Sony",content:"Playstation 1"}]},{question:"Which of these racing franchises would you prefer to play a game from?",answers:[{type:"Microsoft",content:"Forza"},{type:"Nintendo",content:"Mario Kart"},{type:"Sony",content:"Gran Turismo"}]},{question:"Which of these games do you think is best?",answers:[{type:"Microsoft",content:"BioShock"},{type:"Nintendo",content:"The Legend of Zelda: Ocarina of Time"},{type:"Sony",content:"Final Fantasy VII"}]},{question:"What console would you prefer to own?",answers:[{type:"Microsoft",content:"X-Box One"},{type:"Nintendo",content:"Wii U"},{type:"Sony",content:"Playstation 4"}]}],w=n(12);var m=function(e){return Object(c.jsx)("h2",{className:"question",children:e.content})};var y=function(e){return Object(c.jsxs)("div",{className:"questionCount",children:["Question ",Object(c.jsx)("span",{children:e.counter})," of ",Object(c.jsx)("span",{children:e.total})]})};var x=function(e){return Object(c.jsxs)("li",{className:"answerOption",children:[Object(c.jsx)("input",{type:"radio",className:"radioCustomButton",name:"radioGroup",checked:e.answerType===e.answer,id:e.answerType,value:e.answerType,disabled:e.answer,onChange:e.onAnswerSelected}),Object(c.jsx)("label",{className:"radioCustomLabel",htmlFor:e.answerType,children:e.answerContent})]})};n(52);var v=function(e){return Object(c.jsx)(w.CSSTransitionGroup,{className:"container",component:"div",transitionName:"fade",transitionEnterTimeout:800,transitionLeaveTimeout:500,transitionAppear:!0,transitionAppearTimeout:500,children:Object(c.jsxs)("div",{children:[Object(c.jsx)(y,{counter:e.questionId,total:e.questionTotal}),Object(c.jsx)(m,{content:e.question}),Object(c.jsx)("ul",{className:"answerOptions",children:e.answerOptions.map((function(t){return Object(c.jsx)(x,{answerContent:t.content,answerType:t.type,answer:e.answer,questionId:e.questionId,onAnswerSelected:e.onAnswerSelected},t.content)}))})]},e.questionId)})};var q=function(e){return Object(c.jsx)(w.CSSTransitionGroup,{className:"container result",component:"div",transitionName:"fade",transitionEnterTimeout:800,transitionLeaveTimeout:500,transitionAppear:!0,transitionAppearTimeout:500,children:Object(c.jsxs)("div",{children:["You prefer ",Object(c.jsx)("strong",{children:e.quizResult}),"!"]})})},g=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(e){var s;return Object(h.a)(this,n),(s=t.call(this,e)).state={counter:0,questionId:1,question:"",answerOptions:[],answer:"",answersCount:{},result:""},s.handleAnswerSelected=s.handleAnswerSelected.bind(Object(p.a)(s)),s}return Object(j.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=O.map((function(t){return e.shuffleArray(t.answers)}));this.setState({question:O[0].question,answerOptions:t[0]})}},{key:"shuffleArray",value:function(e){for(var t,n,s=e.length;0!==s;)n=Math.floor(Math.random()*s),t=e[s-=1],e[s]=e[n],e[n]=t;return e}},{key:"handleAnswerSelected",value:function(e){var t=this;this.setUserAnswer(e.currentTarget.value),this.state.questionId<O.length?setTimeout((function(){return t.setNextQuestion()}),300):setTimeout((function(){return t.setResults(t.getResults())}),300)}},{key:"setUserAnswer",value:function(e){this.setState((function(t,n){return{answersCount:Object(d.a)(Object(d.a)({},t.answersCount),{},Object(l.a)({},e,(t.answersCount[e]||0)+1)),answer:e}}))}},{key:"setNextQuestion",value:function(){var e=this.state.counter+1,t=this.state.questionId+1;this.setState({counter:e,questionId:t,question:O[e].question,answerOptions:O[e].answers,answer:""})}},{key:"getResults",value:function(){var e=this.state.answersCount,t=Object.keys(e),n=t.map((function(t){return e[t]})),s=Math.max.apply(null,n);return t.filter((function(t){return e[t]===s}))}},{key:"setResults",value:function(e){1===e.length?this.setState({result:e[0]}):this.setState({result:"Undetermined"})}},{key:"renderQuiz",value:function(){return Object(c.jsx)(v,{answer:this.state.answer,answerOptions:this.state.answerOptions,questionId:this.state.questionId,question:this.state.question,questionTotal:O.length,onAnswerSelected:this.handleAnswerSelected})}},{key:"renderResult",value:function(){return Object(c.jsx)(q,{quizResult:this.state.result})}},{key:"render",value:function(){return Object(c.jsxs)("div",{className:"questionnaire",children:[Object(c.jsx)("div",{className:"questionnaire-group"}),this.state.result?this.renderResult():this.renderQuiz()]})}}]),n}(s.Component),N=n(2);var S=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("div",{className:"background"}),Object(c.jsx)("div",{className:"content",children:Object(c.jsx)(a.a,{children:Object(c.jsx)("div",{children:Object(c.jsxs)(N.c,{children:[Object(c.jsx)(N.a,{path:"/questionnaire",children:Object(c.jsx)(g,{})}),Object(c.jsx)(N.a,{path:"/",children:Object(c.jsx)(u,{})})]})})})})]})})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,54)).then((function(t){var n=t.getCLS,s=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),s(e),r(e),o(e),i(e)}))};i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(S,{})}),document.getElementById("root")),T()}},[[53,1,2]]]);
//# sourceMappingURL=main.9be5c0e2.chunk.js.map