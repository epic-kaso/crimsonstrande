<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="myApp" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>CrimsonStrande | Improving the effectiveness of people at work</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width">
        <meta name="keywords" content="business coach, business coaching, business consultancy, business consultant, business management, business productivity, business profitability, C-Suite, C-Suite Coaching, C-Suite development, CEO coach, CEO coaching, CEO consultancy, CEO consultant, change agent, change consultancy, change consultant, change management, change strategy, coach, coaching, communicate, communication, communication consultancy, communication consultant, communication experts, communication management, communication training, constellation, constellations, consultancy, consultancy service, consultant, consultants, culture change, culture change agent, culture change consultancy, culture change consultant, culture change experts, culture change management, equine, equine guided, equine transformation, executive coach, executive coaching, executive consultancy, executive consultant, facilitate, facilitation, facilitation agency, facilitation consultancy, facilitation consultant, facilitation practitioner, facilitation practitioners, facilitation service, facilitator, facilitators, group coach, group coaching, group development, group facilitation, group facilitator, group facilitators, group management, group training, horse coaching, improving business productivity, improving business profitability, leadership coaching, leadership consultancy, leadership consultant, leadership development, leadership management, leadership skills, Leadership training, management change, management consultancy, management consultant, management development, management skills, management training, managerial coach, managerial coaching, managerial consultancy, managerial consultant, Mission, NLP, NLP Practitioner, Organisation consultancy, Organisation consultant, Organisation management, Organisational change, Organisational constellations, Organisational culture change, Organisational development, Organisational transformation, Organization consultancy, Organization consultant, Organization management, Organizational change, Organizational constellations, Organizational culture change, Organizational development, Organizational transformation, productivity, profitability, Psychometric profiling, strategic management, strategy consultancy, strategy consultant, systemic coach, systemic coaching, systemic consultancy, systemic consultant, systemic culture, team coach, team coaching, team development, team facilitation, team facilitator, team facilitators, team management, team training, transformation, vision and mission definition">
        <meta name="description" content="We help you to find structure, focus and balance when it&#39;s most elusive. 
              Focussing on the human aspect of business, we help to build a successful structure that allows your business to flourish. 
              Look at your business in a mirror. Is it how you would like it to be? If not, we’re here to help create a path to success, however you define it."> 

        <meta name="robots" content="index,follow">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600' rel='stylesheet' type='text/css'>    
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootflat.min.css">
        <link rel="stylesheet" type="text/css" href="css/main-v2.css">
        <style>
            
            /* don't forget about the vendor-prefixes! */
        </style>
    </head>
    <body>
        <div class="delay animated fadeInDown navbar navbar-default navbar-crimsonstrande navbar-static-top">
            <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand small-logo" href="#/"><img src="img/helmet-sm.png" class="img-responsive img-circle delay-more animated fadeInDown" style="height: 100px" /></a>
            </div>
            
                <div class="collapse navbar-collapse navbar-right">                
                    <ul class="nav navbar-nav">
                        <li><a class="animation-hover" ui-sref-active="current" ui-sref="home">home</a></li>
                        <li><a class="animation-hover" ui-sref-active="current" ui-sref="approach.approach_1">approach</a></li>
                        <li><a class="animation-hover" ui-sref-active="current" ui-sref="values">values</a></li>
                        <li><a class="animation-hover" ui-sref-active="current" ui-sref="services">our services</a></li>
                        <li><a class="animation-hover" ui-sref-active="current" ui-sref="team">team bios</a></li>
                        <li><a class="animation-hover" ng-click="showContact();" href="">contact us</a></li>
                    </ul>
                </div>
            </div>

        </div>

        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="container">
            <div ui-view class="view-frame"></div>          
        </div>




        <div ng-click="showContact();"
             class="contact-bar delay-more animated bounceInUp message navbar navbar-fixed-bottom navbar-inverse low-height"
              hide="contact">
            <div class="container-fluid"> 
                <div class="row" style="min-height: 0;height: auto;background-color: #000000;color:#a40000">
                    <h5 class="col-sm-offset-10 col-sm-2">Contact Us</h5>
                </div>
                <div class="row" style="min-height: 0;height: auto;background-color: #000000;color:#f2f2f2">
                    <div class="col-sm-3">
                        Lekki, Lagos, Nigeria
                    </div>	
                    <div class="col-sm-3">
                        Lekki, Lagos, Nigeria
                    </div>
                    <div class="col-sm-3">
                        Lekki, Lagos, Nigeria
                    </div>
                    <div class="col-sm-3">
                        <p>To contact us, please send us an e-mail : <a href="mailto:info@crimsonstrande.com">info@crimsonstrande.com</a></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- In production use:
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/x.x.x/angular.min.js"></script>
        -->
        <script src="js/lib/jquery.min.js"></script>
        <script src="js/lib/bootstrap.min.js"></script>

        <script src="js/lib/angular.min.js"></script>
        <script src="js/lib/ui-bootstrap-tpls.min.js"></script>
        <script src="js/lib/angular-ui-router.min.js"></script>
        <script src="js/lib/angular-animate.min.js"></script>
        <script src="js/app.js"></script>
        <script src="js/services.js"></script>
        <script src="js/controllers.js"></script>
        <script src="js/filters.js"></script>
        <script src="js/directives.js"></script>




        <script type="text/ng-template" id="approach-1.html">
            <p>
            Depending on how slow or fast you want to go, we expose you to new experiences, from learning leadership skills on a Colorado horse ranch to using comedy to hone your communication skills. These safe adventures help build the confidence and know-how you need to shake off old corporate habits and rely on the core skills we believe can transform the way you work.<br>
            <br>
            To make sure you get the most out of the journey, we tailor our approach to the real life challenges you face each day. We’re not interested in bumper sticker soundbites. We help you discover new ways of working to improve your business and your bottom line.<br>
            <br>
            As the human element is essential to everything we do, all our services are available on 3 different levels to suit the people involved. The levels we offer are <em>One-to-One</em>, <em>Team &amp; Group</em>, and <em>Organisation</em>, which we can combine depending on your needs.<br>
            <br>
            Whatever service and level you choose, all our experts are individuals with colourful personalities and their own way of doing things. We believe teaming you up with exactly the right expert for everyone on your side is a vital first step.<br>
            <br>
            So where will the journey take you? Every organisation is different but our experience over the last 30 years shows that evolving a company’s culture is the best way to release the incredible potential of the people responsible for its success.<br>
            <br>
            Thom Dennis<br>
            Founder 		</p>
        </script>
        <script type="text/ng-template" id="approach-2.html">
            <p>		
            One day I was waiting for a train in London when this announcement came over the station speakers: “Can a hygiene operative please attend the primary customer zone.” The message was repeated three times before an exasperated voice shouted, “Can a cleaner please come to the ticket office.”<br>
            <br>
            The point I’m trying to make is this: Modern corporate culture with its love of jargon and complex process can sometimes stop us getting the job done.<br>
            <br>
            Why ? Because the rational world of business often overlooks the fact that whatever our role – CEO, Director or Manager – we are all human with an in-built set of powerful skills such as imagination, emotional intelligence, intuition and common sense that can produce incredible results but are hard to quantify in a spreadsheet.<br>
            <br>
            Our aim is to help you transform your company’s culture by encouraging everyone from the Chairman down to use these essential human skills to make them even more effective at work.<br>
            <br>
            To do this we use the ‘Three Ps’: <em>Provocation. Pragmatism. Personality</em>.<br>
            <br>
            After we work with you and your team to gain everyone’s trust, we guide you on a journey to explore and discover different ways of thinking, behaving and achieving at work – at a pace you all feel comfortable with.		</p>


            <p>
            Depending on how slow or fast you want to go, we expose you to new experiences, from learning leadership skills on a Colorado horse ranch to using comedy to hone your communication skills. These safe adventures help build the confidence and know-how you need to shake off old corporate habits and rely on the core skills we believe can transform the way you work.<br>
            <br>
            To make sure you get the most out of the journey, we tailor our approach to the real life challenges you face each day. We’re not interested in bumper sticker soundbites. We help you discover new ways of working to improve your business and your bottom line.<br>
            <br>
            As the human element is essential to everything we do, all our services are available on 3 different levels to suit the people involved. The levels we offer are <em>One-to-One</em>, <em>Team &amp; Group</em>, and <em>Organisation</em>, which we can combine depending on your needs.<br>
            <br>
            Whatever service and level you choose, all our experts are individuals with colourful personalities and their own way of doing things. We believe teaming you up with exactly the right expert for everyone on your side is a vital first step.<br>
            <br>
            So where will the journey take you? Every organisation is different but our experience over the last 30 years shows that evolving a company’s culture is the best way to release the incredible potential of the people responsible for its success.<br>
            <br>
            Thom Dennis<br>
            Founder 		</p>
        </script>
    </body>
</html>
