//GESTION file d'attente__:
//http://www.siteduzero.com/informatique/tutoriels/un-site-web-dynamique-avec-jquery/reprenez-le-controle-des-effets

//Evenement (souris, clavier) click hover leave ... __:
//http://www.siteduzero.com/informatique/tutoriels/un-site-web-dynamique-avec-jquery/quelques-evenements-incontournables

/*Pour le debug__:
----------------------------------- */
var activeDebugLog = false;
function debugConsole (str){
	if ( activeDebugLog === true) {console.log(str);} //ecrit msg dans la console
	else {}
	return true;
}
/************************************************************
*																											*
*							MODULES																	*
*																											*
************************************************************/

var phoenixObsidian = {

    nbPage : 0, //nombre de pages
    nbCurrent : 0, //Numero de la page courant
    slideCibler : false, //si au chargement de la page on demande un slide en particulier
    elemCurrent : null, //Page courante affich�e
    elem : null, //Element qui contient les pages
    page : null, //Page a fficher (au chargement du site)
    elemMenuP : null, //Contenair du menu principal
    typeAnimation : "fade", //fade, slide
	changerPage : true, //Permet de bloquer les changements de page tant que l'on pas fini le changement en cours
	footerIsOpen : false,
	footerIsOpening : false,
	menuActif_is_home : false,
	//Variables pour chaque page
	 pageAccueil : false,
		home_O : false,
	 pageApproach : false,
		approach_O : false,
	 pageTeamBio : false,
		teamBio_O : false,	
	 pageValues : false,
		values_O : false,
	pageEndorsements : false,
		endorsements_O : false,
	pageServices : false,
		services_O : false,
	pageCaseStudies : false,
		caseStudies_O : false,

//FAIRE UN TABLEAU QUI FAIT LA LAISON ENTRE L'ID des PAGE et LEUR numero comme cela on peut changer l'ordre des page sans probleme ult�rieur
		
    init : function(elem, page){
		
	/*************************************************
	*																						*
	*				Fonctions li�es au menu principal							*
	*																						*
	*************************************************/
			this.elemMenuP = $("#header .navigation");
			
			this.elem=elem;
			this.nbPage = elem.find(".page").length;
			debugConsole('Il y a '+this.nbPage+' pages.');
			
			//Ecouteur sur le menu principal__:
				this.elemMenuP.find("a").click(function(){ 
						phoenixObsidian.gotoPage($(this).attr('pageNum'));
						return false;
					});
		
		this.elemMenuP.append('<div class="bgMenuP">&nbsp;</div>'); 
		this.elemMenuP.find('.bgMenuP').hide();

		var timeOutMenu;
		this.elemMenuP.find("a").mouseover(function(){
	
			if (phoenixObsidian.menuActif_is_home==true){
				//return true;
			}
			else{}
			
			clearTimeout(timeOutMenu);
			phoenixObsidian.elemMenuP.find(".bgMenuP").stop(true, true);
			phoenixObsidian.elemMenuP.find(".bgMenuP").show();
			
			var positionTemp = $(this).parent().index(this[0]);
			if(positionTemp == 0 ){
				//si on passe sur l'accueil on ne fait pas suivre le bg
				//phoenixObsidian.elemMenuP.find(".bgMenuP").hide();
				var heightElement= '20';
				timeOutMenu = setTimeout("phoenixObsidian.bgMenuPOrigine(true, true)", 1500);
				return true;
			}
			else{
				var heightElement= $(this).parent().height();
			}

			var positionLeft= $(this).parent().position().left;
			var widthElement= $(this).parent().width();
			
			var cssFin = { "left" : positionLeft, "width" : widthElement , "height" : heightElement };
			//phoenixObsidian.elemMenuP.find(".bgMenuP").css(cssFin, 1500);
			phoenixObsidian.elemMenuP.find(".bgMenuP").animate(cssFin, 900, "easeOutBack");	
		});
		this.elemMenuP.mouseleave(function(){
			//phoenixObsidian.bgMenuPOrigine();
			timeOutMenu = setTimeout(	"phoenixObsidian.bgMenuPOrigine(false, false)", 1500);
		}).mouseover(function(){});
		
		/*this.elemMenuP("a").mouseout(function(){
			var numTemp = $(this).parent().index(this[0]);
			//On reviens a la couleur d'origine uniquement si la values nest pas la values active
			if (numTemp !=  valuesGlobal.nbCurrent){
				$(this).animate({"color":"#ae9e8d"}, 350);
			}
			else{}			
		}).mouseover(function(){
			var numTemp = $(this).parent().index(this[0]);
			var classValue = elem.find(".slide:eq("+numTemp+") p").attr('class') ; //on recupere la classe
			var codeCouleur = classColor_ATemp[classValue];
			$(this).animate({"color":"#"+codeCouleur}, 350);
		});//*/
		
		//Ecouteur sur le bouton pour ouvrir le footer__:
			$("#footer .titleContact, #footer > img").click(function(){ 
					phoenixObsidian.animationFooter();
					return false;
			});
			
			$("#footer").mouseleave(function(){
				phoenixObsidian.animationFooter('close');
			}).mouseenter(function(){
				//phoenixObsidian.animationFooter('open');
			});//*/


		//On cache toutes les pages__:
			elem.find(".page").hide();

		//On charge la page en fonction de l'url__:
			debugConsole("-->Page demande : "+page+", numero : "+this.elem.find("#"+page).index( ));
			
			this.elemMenuP.find("a:first").addClass("active"); //Application du style sur le menu principal sur le premier item
			phoenixObsidian.bgMenuPOrigine(false, false); //on initialise l'animation pour le menu p
			this.elemCurrent = elem.find(".page:first"); //Selection de la page courante
			this.nbCurrent =    this.elem.find("*").index(  this.elemCurrent[0] )   ; //Selection du numero de page courante
			// this.elemCurrent = elem.find("#"+page); //Selection de la page courante
			// this.nbCurrent =     this.elem.find("#"+page).index( ) ; //selection du numero de page courante
			// this.elemMenuP.find("a:eq("+this.nbCurrent+")").addClass("active"); //Application du style sur le menu principal sur l'item selectionn�

			if (page == 'intro' ) {
				debugConsole("-->Lancer animation de l'accueil.");
				phoenixObsidian.animationAccueil("lancer animation de l'accueil"); //On va charger l'intro du site
			}
			else {
				$('#header').show(); //on affiche le header
				$('#footer').show(); //on affiche le footer
				phoenixObsidian.gotoPage( this.elem.find("#"+page).index() );
			}
/*
        this.elem.find(".navigation").css("opacity",0.6);   // On rend la navigation opaque
        this.elem.find(".navigation span:first").addClass("active");
//*/

		/*Chargement des pages en Ajax__:
		-----------------------------------------------------------*/		
			var loaderPage; //Va contenir le nom des pages a charger
			this.elem.find(".page").each(function(){

				loaderPage = $(this).attr("id"); //On recupere l'id des page a charger
				debugConsole('ajax page : '+loaderPage+' a charge');
				
				//On ne va pas charger l'accueil car il ce charge d'office
				if (loaderPage != 'intro' ) {
					phoenixObsidian.chargerPagesAjax(loaderPage);
				}
				else {}
			});

		debugConsole('Il y a '+this.nbPage+' pages. Element courant : '+this.elemCurrent+'. Num page courante : '+this.nbCurrent);
	},
	bgMenuPOrigine : function(fromAccueil, disparitionGracieuse){
	
			var elementMenu = phoenixObsidian.elemMenuP.find(".active");
			var positionTemp = elementMenu.parent().index(this[0]);
			//alert(positionTemp);
			
			//-->on tcheque si on est sur l'accueil
			if (positionTemp==0){
				phoenixObsidian.menuActif_is_home=true;
				//debugConsole('on est sur l\'accueil');
			}
			else {phoenixObsidian.menuActif_is_home=false;
				//debugConsole('on n est PAS sur l\'accueil');
			}
						
			//debugConsole('on replace le BG du menu a l\'origine');
			if(positionTemp == 0 ){
				//phoenixObsidian.elemMenuP.find(".bgMenuP").hide();
				var widthElement= 1;
				var heightElement= 20;
				debugConsole ('on revient a l\'accueil');
			}
			else{
				phoenixObsidian.elemMenuP.find(".bgMenuP").show();
				var widthElement= elementMenu.parent().width();
				var heightElement= elementMenu.parent().height();
			}
	
			phoenixObsidian.elemMenuP.find(".bgMenuP").stop(true, true); //on supprime les animation en cours sur la div de fond pour eviter les sacades et les temps de retards	
			var positionLeft= elementMenu.parent().position().left;
			var cssOrigine = { "left" : positionLeft, "width" : widthElement, "height" : heightElement };
			
			if (fromAccueil == true && disparitionGracieuse==false){
				phoenixObsidian.elemMenuP.find(".bgMenuP").css(cssOrigine);
			}
			else {
				phoenixObsidian.elemMenuP.find(".bgMenuP").animate(cssOrigine, 1000, "easeOutBack");
			}			
			return true;	
	},
	/************************************************************
	*					ON charge en AJAX les pages				*
	************************************************************/
	chargerPagesAjax : function(loaderPage){
				
			//Fonction de chargement ajax
			//*
			 $.ajax({
			   url : 'ajax-get-page.php',
			   type : 'GET', // Le type de la requ�te HTTP, ici devenu POST
			   data : 'page=' + loaderPage, // On fait passer nos variables, exactement comme en GET, au script more_com.php
			   dataType : 'html',
				success : function(code_html, statut){
						 $("#"+loaderPage).html(code_html);
						 //debugConsole('ajax page : '+loaderPage+' charge avec succes');
				},
				error : function(resultat, statut, erreur){
					debugConsole('ajax page : '+loaderPage+' ERREUR de chargement');
				},
				complete : function(resultat, statut){
					//Cest ici que l'on peut declencher des actions
					//debugConsole('ajax page : '+loaderPage+' chargement termine');
				}
			});//*/			
	},
	/************************************************************
	*								ANIMATION D'INTRO DU SITE										*
	************************************************************/
	animationAccueil : function(num){
		//alert(num);
		
		$('#intro').show(); //on affiche la page
		$('#intro .sphere').addClass('animMinusculeSphere'); //On reduit la sphere
		$('#intro .ombre').addClass('animMinusculeOmbre'); //On reduit l'ombre port�e
			
		$('#intro .phenix').hide(); //on masque le phenix
		$('#intro .sphere_img_accueil').hide(); //on masque la phere
		//$('#intro .logo').hide(); //on masque le logo
		//$('#intro .slogan').hide(); //on masque le slogan
		//$('#intro .citations').hide(); //on masque les citations
		
		$('#intro').addClass('afficher'); //ON affiche la page d'intro
			$('#intro .sphere').removeClass("animMinusculeSphere", 1500); //apparition de la sphere 
			$('#intro .ombre').removeClass("animMinusculeOmbre", 2400); //Apparition de l'ombre port��
			
			//$('#intro .logo').delay(1000).fadeIn(3000, phoenixObsidian.phenixIsLoad).delay(500).fadeOut(1500); //Apparition puis disparition du logo marque
			$('#intro .phenix').delay(1000).fadeIn(3000, phoenixObsidian.phenixIsLoad).delay(650).fadeOut(1500); //Apparition puis disparition du phenix
				//$('#intro .phenix').delay(4200).fadeIn(2750, phoenixObsidian.introTermine); //Apparition du logo marque
				$('#intro .sphere_img_accueil').delay(4200).fadeIn(2750, phoenixObsidian.introTermine); //Apparition du logo marque
					
		//$('#intro .sphere').css("transform","scale(1)"); //apparition de la sphere 
		//setTimeout(	$('#intro .sphere').css("transform","scale(0.25)"), 80000);
		
		//On surveille le clicks sur le btn enter__:
		$('.enter').find('a').click(function(){
			var link = $(this).attr('href');
			debugConsole(link);
			debugConsole( $(this).text() );
			phoenixObsidian.displayHomePageFromIntro('accueil'); //On va charger la page d'accueil
			return true;
		});	
	},
	introTermine :  function() {
		debugConsole('logo marque charge on peut entrer dans le site');
			//$('#intro .enter').fadeIn('slow'); //on affiche le bouton "entrer ds le site"	

		//On surveille le clicks sur le logo marque pour entrer dans le site__:
		$('#intro .phenix').click(function(){
			//phoenixObsidian.displayHomePageFromIntro('accueil'); //On va charger la page d'accueil
			//return true;
		});

			$('body').mousemove(function(e){
				$(".enter").fadeIn('slow').css({left:e.clientX + window.pageXOffset, top:e.clientY + window.pageYOffset -90});
			});
		
		phoenixObsidian.displayHomePageFromIntro("accueil"); //On entre ds le site automatiquement
		return true;
	},
	phenixIsLoad :	function() {
		//alert('phenix charg� (sur l accueil');
		debugConsole('phenix charge');
		return true;
	},
	/************************************************************
	*							ON affiche PR la 1 ier fois l'accueil									*
	************************************************************/
	displayHomePageFromIntro :	function(link) {
		debugConsole('on arrive pour la premiere fois sur la home page');

		//Suppression des ecouteurs desormais inutiles cr��s pour l'intro__:
			$('#intro .logo').unbind('click'); //on supprime l'ecoute du click sur le logo
			$('.enter a').unbind('click'); //on supprime l'ecoute du click sur le lien enter
			$('body').unbind('mousemove'); //on supprime le suivi de la souris
			$('#intro .enter').fadeOut('slow'); //on masque le bouton entrer

		var cssHeader = { "top" : $('#header').height() };
		var cssFooter = { "bottom" : $('#footer').height() };

		var headerHeight = $('#header').height();
		$('#header').css("top",-headerHeight).show(); //on place le header au dessus du site
		$('#header').delay(100).animate({"top": 0},700); //on fait apparaitre le header vers le bas
			
		var footerHeight = $('#footer').height();
		$('#footer').css("bottom",-footerHeight).show(); //on place le footre en dessous du site
		$('#footer').delay(100).animate({"bottom": 0},700); //on fait apparaitre le footer vers le haut

		phoenixObsidian.displayPageHome();	//Appel de la fonction qui gere la page d'accueil normale
			
		//parent.location.hash = "#genre";
		//parent.location = link;
		//window.parent.document.location.href = link;
		return true;
	},
	/************************************************************
	*						Affichage normal de la page d'accueil									*
	************************************************************/
	displayPageHome :	function(link) {
		debugConsole('fonction normale sur la page d\'accueil de la page d\'accueil');
	
		$('#intro .slogan').fadeIn(2500); //Apparition de la phrase slogan de l'accueil
		$('#intro .citations').fadeIn(2500); //Apparition des citations

		if ( this.pageAccueil == false ) {
			this.home_O = carrouselGlobal;
			this.home_O.init($("#intro .citations"), 7250, "fade", false, false);
		}
		else{}		
		
		this.pageAccueil=true; //pour ne pas relancer les fonctions JS
		return true;
	},
	/************************************************************
	*						Changement de la classe sur le body									*
	*							si on est sur l'accueil il y a une classe								*
	************************************************************/
	addClassBody :	function(pageNum) {
		//debugConsole('ajout de la classe '+page+' au body');
		if (pageNum == 0 ) {
			$('body').delay(1500).addClass("page-accueil", 500); //le delay cest pour eviter de peter la page quand on passe de l'accueil vers une autre page ou l'inverse
		} 
		else{
			$('body').delay(800).removeClass("page-accueil", 200); //le delay cest pour eviter de peter la page quand on passe de l'accueil vers une autre page ou l'inverse
			//$('body').removeClass(); 
		}	
		return true;
	},			
	/************************************************************
	*								PASSE D'UNE PAGE A L'AUTRE										*
	************************************************************/
	gotoPage :	function(pageNum, slideCibler) {

		if(pageNum==this.nbCurrent){
			debugConsole("Page demandee = page en cour");
			return false; 
		}
		else if ( this.changerPage == false ) {
			
			debugConsole("impossible de charger la page un chargement est deja en cours !");
			return false;
		}
		else if  (pageNum=="contact"){
				phoenixObsidian.animationFooter();
				return true;
			}
		else {
			debugConsole("chargement de la page numero "+pageNum);
			phoenixObsidian.addClassBody(pageNum);	//Appel de la fonction qui gere la classe sur le body
			//window.setTimeout("phoenixObsidian.addClassBody("+pageNum+")",0);
		}
		
		this.changerPage = false; //Permet de bloquer le changement de page lorsque une page est deja entraint de charger
			
		//Va masquer tout le contenu de la page sauf la div	
		var currentTemp;
		this.elem.find(".page:eq("+pageNum+")").each(function(){
		
			if (pageNum=="5"){
				//si page team bio
				currentTemp = $(this).find('.contenair-portrait'); //Cest le portrait que l'on cible
				$(currentTemp).siblings().hide(); //On cache tous les �l�ments frere sauf l'�l�ment courant
				$(this).find('.nav-team-bio').fadeIn(3000);
			}
			else if  (pageNum=="3"){
				currentTemp = $(this).find('.contenair-sphere'); //Cest la shere que l'on cible
				$(currentTemp).siblings().hide(); //On cache tous les �l�ments frere sauf l'�l�ment courant
				//$(this).find('.slide').fadeIn(6000); //on affiche en fade les services
			}
			else {
				currentTemp = $(this).find('.contenair-sphere'); //Cest la shere que l'on cible
				$(currentTemp).siblings().hide(); //On cache tous les �l�ments frere sauf l'�l�ment courant
			}
			
				//alert(currentTemp);
				// $(this).find("*").hide();
				// $(this).find('.sphere').show();
		});
			//this.elem.find(".page:eq("+pageNum+" .sphere)").siblings().hide();
		
		//On fait scroller le site vers le haut (cest au cas ou l'on vienne d'une avec du scroll vertical
			$('#containair').animate({scrollTop:0}, 1000,'swing'); //swing, easeOutExpo
		
		/* --> Animation en slide */
			var sens = 1;
			if(pageNum<this.nbCurrent){ sens = -1;}
			

			var cssDeb = { "left" : sens*this.elem.width()*2 };
				debugConsole("css debut "+(sens*this.elem.width()) );
				
			var cssFin = { "left" : (-sens*this.elem.width())*2.5 };
				debugConsole("css fin "+(-sens*this.elem.width()) );
			
			//this.elem.find("#slide"+pageNum).show().css(cssDeb);
			this.elem.find(".page:eq("+pageNum+")").fadeIn(500).css(cssDeb);
			
			//this.elem.find("#slide"+num).animate({"top":0,"left":0},500);
			//this.elem.find(".page:eq("+pageNum+")").animate({"top":0,"left":0}, 2000, "easeOutExpo", phoenixObsidian.pageArrive(pageNum)  );
		
		//Annimation de la sphere qui arrive__:
		this.slideCibler = slideCibler; //On met dans la variable le slide que l'on veut cible [a mettre avant l'appel de page arriv� car on s'en sert dans cette function]
		
			this.elem.find(".page:eq("+pageNum+")").animate({"top":0,"left":0}, 2000, "easeOutExpo").queue(function(){
				phoenixObsidian.pageArrive(pageNum);
				$(this).dequeue();
			});//*/
		//Fade in du contenu
			this.elem.find(".page:eq("+pageNum+") .content").delay(1000).fadeIn(1000); //Ici on affiche pour toutes les pages en fade in la div content

			
			//this.elem.find(".page:eq("+pageNum+")").animate({"top":0,"left":0},{queue:false,  duration:1000}, "easeOutExpo");
			//window.setTimeout("phoenixObsidian.pageArrive("+pageNum+")", 2000); //ne fonctionne pas 
		
			
			//EASING : http://jqueryui.com/effect/#easing
			
			//On fait disparaitre la div en cour & on assigne la nouvelle page courante__:
				//this.elemCurrent.animate(cssFin,500);
				//this.elemCurrent.fadeOut(500);
				var nbCurrentTemp = this.nbCurrent;
				this.elemCurrent.animate(cssFin,2000).queue(function(){
					$(this).fadeOut(500).hide();
					phoenixObsidian.pageDepart(nbCurrentTemp); //on indique que l'on vient de quitte cette page (a faire avant this.nbCurrent = pageNum).
					$(this).dequeue();
				});
				
			//Menu principal on gere le lien actif (page courante)
				this.elemMenuP.find("a").removeClass("active");
				this.elemMenuP.find("a:eq("+pageNum+")").addClass("active"); //Application du style sur le menu principal sur l'item selectionn�
				
				//-->on le place derri�re l'item actif le fond de couleur qui va suivre la souris
					if (this.nbCurrent>0){
						phoenixObsidian.bgMenuPOrigine(false, false);
					}
					else{
						phoenixObsidian.bgMenuPOrigine(true, false);
					}
					
				this.nbCurrent = pageNum; //Le numero de page courante devient celle qui vient d'arriver
				this.elemCurrent = this.elem.find(".page:eq("+pageNum+")"); //l'element page courant devient celle qui vient d'arriver
		

    /*  
	$('p')
    .animate({
        fontSize : '+=100px'
    })
    .queue(function(){
        alert('Bonjour !');
        $(this).dequeue();
    })
    .animate({
        fontSize : '-=50px'
    })
    .queue(function(){
        alert('Au revoir !');
        $(this).dequeue();
    });
//*/

		return true;
	},
	pageArrive :	function(pageNum) {
		debugConsole("Ma page "+pageNum+" est arrive on peut afficher le reste");
		//On change l'url__:
			window.location.hash = "!"+this.elem.find(".page:eq("+pageNum+")").attr('id');
			
		this.changerPage = true; // On autorise le changement de page
		//this.elemCurrent.find(".content").fadeIn(800); //Ici on affiche pour toutes les pages en fade in la div content
			
			
		/* Essayer de supprimer toutes les animations des autres__:
			cela consommerait moins de ressource
		--------------------------------------------------------------------------*/
			//	$(this).unbind(this.home_O);
			//	delete this.home_O;
		
		
		//Repartiteur qui va charger la fonctions unique pour chaque page__:
		if (pageNum == 0 ) {
			phoenixObsidian.displayPageHome();	//Appel de la fonction qui gere la page d'accueil normale
		}
		else if (pageNum == 1 ) {
			phoenixObsidian.displayPageApproach();	//Appel de la fonction qui gere la page approach
		}
		else if (pageNum == 2 ) {
			phoenixObsidian.displayPageValues();	//Appel de la fonction qui gere la page values
		}
		else if (pageNum == 3 ) {
			phoenixObsidian.displayPageServices();	//Appel de la fonction qui gere la page values
		}
		else if (pageNum == 4 ) {
			phoenixObsidian.displayPageCaseStudies();	//Appel de la fonction qui gere la page values
		}
		else if (pageNum == 5 ) {
			phoenixObsidian.displayPageTeamBio();	//Appel de la fonction qui gere la page team bio
		}
		else if (pageNum == 6 ) {
			phoenixObsidian.displayPageEndorsements();	//Appel de la fonction qui gere la page team bio
		}
		else {} //
	},
	pageDepart :	function(pageNum) {
	
		//Si le footer est ouvert on le referme
		if (this.footerIsOpen === false){
		}
		else {
			phoenixObsidian.animationFooter();
			this.footerIsOpen = false;
		}
			
		//Repartiteur qui va charger la fonctions unique de depart de page__:
		if (pageNum == 0 ) {
			//Appel de la fonction qui gere la page d'accueil normale
		}
		else if (pageNum == 1 ) {
			//Appel de la fonction qui gere la page approach
		}
		else if (pageNum == 2 ) {
			this.values_O.goOutPageValues();//Appel de la fonction qui gere la sortie de la page values
		}
		else if (pageNum == 3 ) {
			this.services_O.goOutPage();//Appel de la fonction qui gere la sortie de Services
		}
		else if (pageNum == 4 ) {
			//Appel de la fonction qui gere la sortie de case studies
			this.caseStudies_O.goOutPage();//Appel de la fonction qui gere la sortie de la page case studies
		}
		else if (pageNum == 5 ) {
			//Appel de la fonction qui gere la sortie de team bio
		}
		else if (pageNum == 7 ) {
			//Appel de la fonction qui gere la sortie de endorsement
		}
		else {}
	},
	displayPageApproach :	function(link) {
		
		if ( this.pageApproach == false ) {
			debugConsole('1er appel de fonction js specifique a la page Our approach');
			this.approach_O = ourApproachGlobal;
			this.approach_O.init($("#approach .pages"), true, true, "1");
			//alert( approach_O.nbSlide);
		}
		else{}		
		this.pageApproach=true; //pour ne pas relancer les fonctions JS
		return true;
	},
	displayPageTeamBio :	function(link) {
		
		if ( this.pageTeamBio == false ) {
			debugConsole('1er appel de fonction js specifique a la page Our approach');
			this.teamBio_O = teamBioGlobal;
			this.teamBio_O.init($("#team-bios"), true);
		}
		else{}		
		this.pageTeamBio=true; //pour ne pas relancer les fonctions JS
		return true;
	},
	displayPageValues :	function(link) {
		
		if ( this.pageValues == false ) {
			this.values_O = valuesGlobal;
			debugConsole('1er appel de fonction js specifique a la page values');
			this.values_O.init($("#values"), true);
		}
		else{}		
		this.pageValues=true; //pour ne pas relancer les fonctions JS
		return true;
	},
	displayPageEndorsements :	function(link) {
		
		if ( this.pageEndorsements == false ) {
			debugConsole('1er appel de fonction js specifique a la page Endorsement');
			this.endorsements_O = endorsementsGlobal;
			this.endorsements_O.init($("#endorsements"));
		}
		else{}		
		this.pageEndorsements=true; //pour ne pas relancer les fonctions JS
		return true;
	},
	displayPageServices :	function(link) {
		
		if ( this.pageServices == false ) {
			debugConsole('1er appel de fonction js specifique a la page Our Services');
			this.services_O = servicesGlobal;
			this.services_O.init($("#our-services"));
		}
		else{}

		//Si un Services est cibl� en particulier
		if (!this.slideCibler || this.slideCibler === false ){
			//debugConsole('aucun services cibl�');
		}else{
			//debugConsole('services cible : '+this.slideCibler );
			this.services_O.gotoServices( this.slideCibler );
			this.slideCibler=false;
		}
		this.pageServices=true; //pour ne pas relancer les fonctions JS //On doit relancer le js a chaque fois pour la communication avec case studies
		return true;
	},
	displayPageCaseStudies :	function(link) {
	
		if ( this.pageCaseStudies == false ) {
			this.caseStudies_O = caseStudiesGlobal;
			debugConsole('1er appel de fonction js specifique a la page Case Studies');
			this.caseStudies_O.init($("#case-studies"));
		}
		else{}	

		//-->Si un case studies est cibl� en particulier
		if (!this.slideCibler || this.slideCibler === false ){
			//debugConsole('aucun Case Studies cibl�');
		}else{
			//debugConsole('case studies cible : '+this.slideCibler );
			this.caseStudies_O.gotoCaseStudies( this.slideCibler );
			this.slideCibler=false;
		}
		this.pageCaseStudies=true; //pour ne pas relancer les fonctions JS //On doit relancer le js a chaque fois pour la communication avec services
		return true;
	},
	animationFooter :	function(action) {
	
		if ( this.footerIsOpening == true){
			return true; //si une action d'ouverteure ou de fermeture et deja en cour on ne prend pas d'autre action
		}
		else{ this.footerIsOpening=true;}
		
		
		if (action=='close'){
			//Si cest deja ferme on ne fait rien
			if (this.footerIsOpen === false){
				phoenixObsidian.footerIsOpening=false;
				return true;
			} 
			else{}
			this.footerIsOpen =true;
		}
		else if (action=='open') {
				
			if (this.footerIsOpen === true){
				phoenixObsidian.footerIsOpening=false;
				return true; //Si cest deja ouvert on ne fait rien
			} 
			else{}
			this.footerIsOpen =false;
		}
		else{}
		
		
		if (this.footerIsOpen === false){
			var hauteur = 108;
			this.footerIsOpen = true;
			debugConsole('ouverture du footer');
			$("#footer .deco").addClass('deco-active'); //on ajoute la classe pour effectuer la 
		}
		else {
			var hauteur = 25;
			this.footerIsOpen = false;
			debugConsole('fermeture du footer');
			$("#footer .deco").removeClass('deco-active'); //on ajoute la classe pour effectuer la 
		}
		// easeOutElastic = elastic ; easeInOutQuint = acceleration puis ralentissement 
		$("#footer").animate({"height":hauteur}, 1500, "easeOutElastic").queue(function(){
				$(this).dequeue();
				phoenixObsidian.footerIsOpening=false;
		});//*/
		return true;	
	},
}

/*Au chargement du site on verifie dans qu'elle page on se trouve__:
-------------------------------------------------------------------------- */
jQuery(function($){

	var page = $(document).getUrlParam("p"); //on recupere la page courante
	
	if ( page == null || page == '' ) {
		page = parent.location.hash; //On prend l'ancre comme page
		page = page.replace(/^#!/, ''); //suppression de "#" au debut de l'ancre
	}
	else{}
	
	if ( page == null || page == '' || page == ' ' ) {
		page = 'intro'
	}
	else{}
	
	//$('#intro .enter').fadeIn('slow'); //on affiche le bouton "entrer ds le site"	
	phoenixObsidian.init($("#contain"), page); //On initialise le site

	$(window).unload(function() {
		debugConsole("Vous avez demand� � changer de page");
		return false;
	});
	//*/

/*	
function afficher(html){ // pour remplacer le contenu du div tabContent
$("#tabContent").empty(); // on vide le div
$("#tabContent").append(html); // on met dans le div le r�sultat de la requete ajax


	var anchor = window.location.hash;
	var url = window.location;
	//alert(url);
	
//page = url.param('page');
//alert(window.location.param('sky')); // returns 'blue');
//var newUrl = $.newUrl(url, {param:2}) # 'http://mypage.com/?param=2'

	$('#header').each(function(){
		var current = null;
		
		//ON verifie si une ancre est passer dans l'url
		if (anchor != '' && $(this).find('a[href="'+anchor+'"]').length > 0 ) {
			current = anchor;
		}
		else {
			current = $(this).find('a:first').attr('href');
		}
		
		//alert(current);
		$(this).find('a[href="'+current+'"]').addClass('active'); //On ajoute la classe active sur le lien du menu
		
		$(current).siblings().hide(); //On cache tous les �l�ments sauf l'�l�ment courant
		
		
		//On surveille les clicks sur le menu principal
		$(this).find('a').click(function(){
		var link = $(this).attr('href');
			if ( link == current ) {
				//On ne fait rien car on est sur la page courant
				return false;
			}
			else {
				$(this).siblings().removeClass('active');
				$(this).addClass('active'); 
				$(link).show().siblings().hide();
				current = link;
			}
		});
	});
//*/	
});

/************************************************************************************************************
*																																																	*
*														CARROUSEL GENERAL	(accueil)																								*
*																																																	*
************************************************************************************************************/
/* carrouselGlobal JS */
var carrouselGlobal = {

    nbSlide : 0,
    nbCurrent : 0,
    elemCurrent : null,
    elem : null,
    timer1 : null,
	vitesseDefilement : 4000, //vitesse de defilement entre les slides
    typeAnimation : "fade", //fade, slide
	pagination : false, //Si on affiche ou pas la pagination
	flecheNav : false, //Si on affiche ou pas les bouton preced && suivant
	navOpacity : "0.6", //Si on met une opacite sur la nav (pour voir l'image derri�re)

    init : function(elem, vitesse, typeAnim, pagination, flecheNav, navOpacity){
	
        this.pagination = pagination;
        this.flecheNav = flecheNav;
        this.navOpacity = navOpacity;
        this.nbSlide = elem.find(".slide").length;
		debugConsole("il y a "+  this.nbSlide+" mini slide ");
		

        /* Cr�er la pagination__:
		-----------------------------------------------*/
		if ( this.pagination == true ) {
			
			elem.append('<div class="navigation"></div>');
			for(var i=0;i<this.nbSlide;i++){
				elem.find(".navigation").append("<span numeroSlide="+i+" >&nbsp;"+i+"</span>"); //si l'on veut mettre un num�roe il fuat remplacer le &nbsp par i+1
			}
			//elem.find(".navigation span").click(function(){ carrouselGlobal.gotoSlide($(this).text()); })
			elem.find(".navigation span").click(function(){ 
					carrouselGlobal.gotoSlide($(this).attr('numeroSlide'));
				}) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			}
		else{}

        // Initialisation du carrouselGlobal
        this.elem=elem;
        this.vitesseDefilement=vitesse;
        this.typeAnimation=typeAnim;
        elem.find(".slide").hide(); //on cache ts les slide
        elem.find(".slide:first").show();
        this.elemCurrent = elem.find(".slide:first");
        this.elem.find(".navigation").css("opacity",this.navOpacity);   // On rend la navigation opaque
        this.elem.find(".navigation span:first").addClass("active");

		
		if ( this.vitesseDefilement == 0 ) {
			//Si la vitesse de defillement est nulle on ne met pas de timer
		}
		else {
			// On cr� le timer
			carrouselGlobal.play();
			// Stop quand on passe dessus
			elem.mouseover(carrouselGlobal.stop);
			elem.mouseout(carrouselGlobal.play);
		}
		
		
		/*Cr�ation des fleches suivante et precedente__:
		------------------------------------------------------------*/
		if ( this.flecheNav == true ) {
			elem.append('<div class="navigationLeft"><span> LEFT </span></div>');
			elem.find(".navigationLeft").click(function(){ carrouselGlobal.prev(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			elem.find(".navigationLeft span").click(function(){ carrouselGlobal.prev(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			
			elem.append('<div class="navigationRight"><span> RIGHT </span></div>');
			elem.find(".navigationRight").click(function(){ carrouselGlobal.next(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			elem.find(".navigationRight span").click(function(){ carrouselGlobal.next(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
		}
		else{}
		
		/*Ecouteur du click pour passer a la citation suivante
		-----------------------------------------------------------------*/
			elem.click(function(){ carrouselGlobal.next(); });
    },

    gotoSlide : function(num){

        if(num==this.nbCurrent){ return false; }
        //alert (num);
        /* Animation en fadeIn/fadeOut 
        this.elemCurrent.fadeOut();
        this.elem.find("#slide"+num).fadeIn();
        */

		debugConsole("afficher le slogan "+num);

        //Choix du type de transition
		if (this.typeAnimation == "slide") 
		{
		/* --> Animation en slide */
			var sens = 1;
			if(num<this.nbCurrent){ sens = -1;}
			var cssDeb = { "left" : sens*this.elem.width() };
			var cssFin = { "left" : -sens*this.elem.width() };
			
			//this.elem.find("#slide"+num).show().css(cssDeb);
			this.elem.find(".slide:eq("+num+")").show().css(cssDeb);
			
			//this.elem.find("#slide"+num).animate({"top":0,"left":0},500);
			this.elem.find(".slide:eq("+num+")").animate({"top":0,"left":0},500);
			this.elemCurrent.animate(cssFin,500);
			
			//Pour faire apparaitre en montant le title du slide
			var titleHeight = this.elemCurrent.find(".title").height();
			this.elem.find(".slide:eq("+num+") .title").css("bottom",-titleHeight); //on fait disparaitre le tritre
			this.elem.find(".slide:eq("+num+") .title").delay(500).animate({"bottom": 0},700); //on fait apparaitre le titre du slide arrivant (de bas en haut) //delay fait une pause avant de l'ancer l'apparition du titre
		}
		else
		{
		/* --> Animation Titre + Fadein/Out sur la div visu */
			this.elemCurrent.fadeOut(800); //on fait disparaitre limage courrante
			
			//this.elem.find(".slide:eq("+num+")").show(); //on fait apparaitre le slide courant
			this.elem.find(".slide:eq("+num+")").fadeIn(1000); //on fait apparaitre le slide courant
						
			var titleHeight = this.elemCurrent.find(".title").height();
			this.elemCurrent.find(".title").animate({"bottom": -titleHeight},500); //on fait disparaitre le titre du slide courant (du haut vers le bas)
			this.elem.find(".slide:eq("+num+") .title").css("bottom",-titleHeight).animate({"bottom": 0},500); //on fait apparaitre le titre du slide arrivant (de bas en haut)
			//*/
		}


        //On gere le span actif pr la navigation
        this.elem.find(".navigation span").removeClass("active");
        this.elem.find(".navigation span:eq("+(num)+")").addClass("active");

        this.nbCurrent = num;
       // this.elemCurrent = this.elem.find("#slide"+num);
		this.elemCurrent = this.elem.find(".slide:eq("+num+")");
		
    },
    
    next : function(){
        var num  = this.nbCurrent+1;
        if(num  >=this.nbSlide){
            num  = 0;
        }
        carrouselGlobal.gotoSlide(num);
		
    },
    prev : function(){
		var num  = this.nbCurrent-1;
		if(num< 0){
			num= this.nbSlide-1;
		}
		else {}


		carrouselGlobal.gotoSlide(num);
		
    },
    stop : function(){
        window.clearInterval(carrouselGlobal.timer1);
    },
    play : function(){
        window.clearInterval(carrouselGlobal.timer1);
        carrouselGlobal.timer1 = window.setInterval("carrouselGlobal.next()",carrouselGlobal.vitesseDefilement);
    }
} // END var carrouselGlobal =
//------------------------------END CARROUSEL GENERAL (accueil)----------------------------------------------------------------------------------

/************************************************************************************************************
*																											*
*									OUR APPROACH															*
*																											*
************************************************************************************************************/
/* ourApproach JS */
var ourApproachGlobal = {

    nbSlide : 0,
    nbCurrent : 0,
    elemCurrent : null,
    elem : null,
	pagination : false, //Si on affiche ou pas la pagination
	flecheNav : false, //Si on affiche ou pas les bouton preced && suivant
	navOpacity : "0.6", //Si on met une opacite sur la nav (pour voir l'image derri�re)

    init : function(elem, pagination, flecheNav, navOpacity){
	
        this.pagination = pagination;
        this.flecheNav = flecheNav;
        this.navOpacity = navOpacity;
        this.nbSlide = elem.find(".slide").length;
		debugConsole("il y a "+  this.nbSlide+" mini slide ");
		

        /* Cr�er la pagination__:
		-----------------------------------------------*/
		if ( this.pagination == true ) {
			
			elem.append('<div class="navigation"></div>');
			for(var i=0;i<this.nbSlide;i++){
				elem.find(".navigation").append("<span numeroSlide="+i+" >&nbsp;"+(i+1)+"</span>"); //si l'on veut mettre un num�roe il fuat remplacer le &nbsp par i+1
			}
			//elem.find(".navigation span").click(function(){ ourApproachGlobal.gotoSlide($(this).text()); })
			elem.find(".navigation span").click(function(){ 
					ourApproachGlobal.gotoSlide($(this).attr('numeroSlide'));
				}) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			}
		else{}

        // Initialisation du ourApproachGlobal
		this.elem=elem;
		// elem.find(".slide").hide(); //on cache ts les slide [pas besoin ils sont cach�s en css]
		//elem.find(".slide:first").show();
		this.elemCurrent= elem.find(".slide:first");
		this.elem.find(".rendu").html( this.elemCurrent.html() ); //On affiche dans la div de rendu la premiere page
		
        this.elem.find(".navigation").css("opacity",this.navOpacity);   // On rend la navigation opaque
        this.elem.find(".navigation span:first").addClass("active");
		$(".sphere .approach-sh-2 img").hide(); //on cache la sphere derriere

		
		/*Cr�ation des fleches suivante et precedente__:
		------------------------------------------------------------*/
		if ( this.flecheNav == true ) {
			elem.append('<div class="navigationLeft"><span> LEFT </span></div>');
			elem.find(".navigationLeft").click(function(){ ourApproachGlobal.prev(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			elem.find(".navigationLeft span").click(function(){ ourApproachGlobal.prev(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			
			elem.append('<div class="navigationRight"><span> RIGHT </span></div>');
			elem.find(".navigationRight").click(function(){ ourApproachGlobal.next(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			elem.find(".navigationRight span").click(function(){ ourApproachGlobal.next(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
		}
		else{}
		
		/*Cr�ation des ecouteur pour le hover sur la shere
		-----------------------------------------------------*/
			// $("#approach .approach-sh-1").mouseover(function(){
				// ourApproachGlobal.hoverShpere();
				// return true;
			// });
			// $("#approach .approach-sh-2").mouseover(function(){
				// ourApproachGlobal.hoverShpere();
				// return true;
			// });
				
		/*Cr�ation des ecouteur pour le mouseout sur la shere
		-----------------------------------------------------*/
			// $("#approach .approach-sh-hover").mouseout(function(){
			
				// ourApproachGlobal.outShpere();
				// return true;
			// });
    },
	
	hoverShpere : function(){
	
			var cssDeb = { "left" : $(".sphere").width() };
			var cssFin = { "left" : -$(".sphere").width() };
			//alert(this.nbCurrent);
					
			if (this.nbCurrent == 0) {
				//$(".sphere .approach-sh-1 img").fadeOut(800); 
				$(".sphere .approach-sh-1").animate(cssFin, 500);
			}
			else {
				//$(".sphere .approach-sh-2 img").fadeOut(800);
				$(".sphere .approach-sh-2").animate(cssFin, 500);
			}
		
			$(".sphere .approach-sh-hover").show().css(cssDeb).animate({"left":0}, 500);
			//$(".sphere .approach-sh-hover").fadeIn(1000);
			
			debugConsole("hover sphere");
			return true;
	
	},
	outShpere : function() {
	
			var cssDeb = { "left" : $(".sphere").width() };
			var cssFin = { "left" : -$(".sphere").width() };
			//alert(this.nbCurrent);
					
			if (this.nbCurrent == 0) {
				//$(".sphere .approach-sh-1 img").fadeOut(800); 
				$(".sphere .approach-sh-1").animate({"left":0}, 500);
			}
			else {
				//$(".sphere .approach-sh-2 img").fadeOut(800);
				$(".sphere .approach-sh-2").animate({"left":0}, 500);
			}
		
			$(".sphere .approach-sh-hover").show().animate(cssDeb, 500);
			//$(".sphere .approach-sh-hover").fadeIn(1000);
			
			debugConsole("hover out sphere");
			return true;	
	},
    gotoSlide : function(num){

        if(num==this.nbCurrent){ return false; }
		debugConsole("go page apporach  "+num);


		/* --> AnimationFadein/Out sur la div  */
			//this.elemCurrent.fadeOut(800); //on fait disparaitre limage courrante
			//this.elem.find(".slide:eq("+num+")").fadeIn(1000); //on fait apparaitre le slide courant
			
/*
		this.elem.queue(function() {
			
			$(this).find(".rendu").fadeOut(500);
			$(this).dequeue();
		});
		this.elem.queue(function() {
			
			var htmlTemp = $(this).find(".slide:eq("+num+")").html() ;
			$(this).find(".rendu").html("TOTO");
			//$(this).dequeue();
		});
		this.elem.queue(function() {
			
			$(this).find(".rendu").fadeIn(500);
			//$(this).dequeue();
		});
//*/
		var htmlTemp = this.elem.find(".slide:eq("+num+")").html() ;
		
		this.elem.find(".rendu").fadeOut(500, function suivante() {
		
			$(this).html(htmlTemp);
			$(this).fadeIn(500);
		});
		
	//*
		if (num == 1) {
			$(".sphere .approach-sh-1 img").fadeOut(800); 
			$(".sphere .approach-sh-2 img").show().fadeIn(1000);
		}
		else {
			$(".sphere .approach-sh-2 img").fadeOut(800);
			$(".sphere .approach-sh-1 img").fadeIn(1000);
		}
	//*/
		/* //CA devrait fonctionner mais cela ne fonctionne pas correctement Oo
		//$("#approach .sphere img").fadeOut(600);
		$("#approach .sphere img:eq("+(num)+")").siblings().fadeOut(600);
		$("#approach .sphere img:eq("+(num)+")").fadeIn(600);
		/**/
		
        //On gere le span actif pr la navigation__:
        this.elem.find(".navigation span").removeClass("active");
        this.elem.find(".navigation span:eq("+(num)+")").addClass("active");

        this.nbCurrent = num;
       // this.elemCurrent = this.elem.find("#slide"+num);
		this.elemCurrent = this.elem.find(".slide:eq("+num+")");
    },
    
    next : function(){
        var num  = this.nbCurrent+1;
        if(num  >=this.nbSlide){
            num  = 0;
        }
        this.gotoSlide(num);
		
    },
    prev : function(){
		var num  = this.nbCurrent-1;
		if(num< 0){
			num= this.nbSlide-1;
		}
		else {}
		this.gotoSlide(num);
		
    },
} // END var ourApproachGlobal =
//------------------------------END page ourApproachGlobal ----------------------------------------------------------------------------------

/************************************************************************************************************
*																											*
*									TEAM BIO																*
*																											*
************************************************************************************************************/
/* teamBioGlobal JS */
var teamBioGlobal = {

    nbSlide : 0,
    nbCurrent : 0, //la personne/portrait affich� en cour
    nbCurrentInfoPerso : 0, //le sous menu du portrait affich� en cours (bio/qualification)
    elemCurrent : null,
    elem : null,
    elemMenuTeamBio : null,
	pagination : false, //Si on affiche ou pas la pagination
	directionRotation : 180, //passe de 180 a 0;

    init : function(elem, pagination){
	
		this.pagination=pagination;
        this.nbSlide = elem.find(".slide").length;
		// Initialisation du teamBioGlobal
		this.elem=elem;
		debugConsole("il y a "+  this.nbSlide+" team bio !");

        /* Ecoute du click sur le menu de team bio__:
		-----------------------------------------------*/
		this.elemMenuTeamBio = this.elem.find(".nav-team-bio");
		if ( this.pagination == true ) {			
			this.elemMenuTeamBio.find("a").click(function(){ 
			
				debugConsole('afficher la persone a la position : '+$(this).parent().index(this[0]) );
				teamBioGlobal.gotoTeamBio( $(this).parent().index(this[0]) );
				return false;
			})
		}
		else{}

		/* Ecoute du click sur le menu secondaire des personnage (bio/qualification)__:
		-----------------------------------------------*/
		if ( this.pagination == true ) {			
			this.elem.find(".rendu ul a").click(function(){ 
			
				debugConsole('afficher le sous menu a la position : '+$(this).parent().index(this[0]) );
				teamBioGlobal.gotoInfoPerso( $(this).parent().index(this[0]) );
				return false;
			})
		}
		else{}

        this.elem.find(".nav-team-bio a:first").addClass("active");
        this.elem.find(".rendu ul a:first").addClass("active");
		
		/* Pour l'effet lors du survol du menu secondaire__:
		-----------------------------------------------------------------------------------*/
			this.elemMenuTeamBio.append('<div class="bgMenuTeamBio">&nbsp;</div>'); 
			this.elemMenuTeamBio.find('.bgMenuTeamBio').hide();
			teamBioGlobal.bgMenuTeamBioOrigine(true); //on place au bon endroit le bg
			var timeOutMenuTB;
			
			this.elemMenuTeamBio.find("a").mouseover(function(){
				clearTimeout(timeOutMenuTB);
				teamBioGlobal.elemMenuTeamBio.find(".bgMenuTeamBio").stop(true, true);
				teamBioGlobal.elemMenuTeamBio.find(".bgMenuTeamBio").show();
				
				var positionTemp = $(this).parent().index(this[0]);

				var heightElement= $(this).parent().height();
				

				var positionLeft= $(this).parent().position().left;
				var positionTop= $(this).parent().position().top;
				var widthElement= $(this).parent().width();
				
				var cssFin = { "top" : positionTop,  "left" : positionLeft, "width" : widthElement , "height" : heightElement };
				teamBioGlobal.elemMenuTeamBio.find(".bgMenuTeamBioOrigine").css(cssFin, 1500);
				teamBioGlobal.elemMenuTeamBio.find(".bgMenuTeamBio").animate(cssFin, 900, "easeOutBack");	
			});
			this.elemMenuTeamBio.mouseleave(function(){
				timeOutMenuTB = setTimeout("teamBioGlobal.bgMenuTeamBioOrigine(false)", 1500);
			}).mouseover(function(){});
    },
	bgMenuTeamBioOrigine : function(hideDeplacement){
	
			var elementMenu = teamBioGlobal.elemMenuTeamBio.find(".active");
			var positionTemp = elementMenu.parent().index(this[0]);
			//alert(positionTemp);

			if ( hideDeplacement == true){
				teamBioGlobal.elemMenuTeamBio.find(".bgMenuTeamBio").hide();
			}
			else {
				teamBioGlobal.elemMenuTeamBio.find(".bgMenuTeamBio").show();
			}
			var widthElement= elementMenu.parent().width();
			var heightElement= elementMenu.parent().height();

			teamBioGlobal.elemMenuTeamBio.find(".bgMenuTeamBio").stop(true, true); //on supprime les animation en cours sur la div de fond pour eviter les sacades et les temps de retards	
			var positionLeft= elementMenu.parent().position().left;
			var positionTop= elementMenu.parent().position().top;
			
			var cssOrigine = { "top" : positionTop,  "left" : positionLeft, "width" : widthElement, "height" : heightElement };

			teamBioGlobal.elemMenuTeamBio.find(".bgMenuTeamBio").animate(cssOrigine, 1000, "easeOutBack");		
			return true;	
	},
    gotoInfoPerso : function(numInfoPerso){
	
		if(numInfoPerso==this.nbCurrentInfoPerso){ return false; }
		else{}
		debugConsole("GO to sous menu portrait numero  "+numInfoPerso);
		
		var textTemp = this.elem.find(".slide:eq("+this.nbCurrent+") div:eq("+numInfoPerso+")").html() ; //on recupere la bio
		//disparition du texte en fade ; remplacement du texte par le nouveau ; apparition du texte en fade
		this.elem.find(".rendu div:eq(1)").slideUp(500, function suivante() {
			$(this).html(textTemp);
			$(this).slideDown(500);
		});
		
		this.nbCurrentInfoPerso = numInfoPerso; //On change le numero du sous menu couramment utilis�
	
		//On gere la classe pour le sous menu actif
		this.elem.find(".rendu ul a").removeClass("active");
        this.elem.find(".rendu ul a:eq("+(numInfoPerso)+")").addClass("active");
	},
    gotoTeamBio : function(num){

        if(num==this.nbCurrent){ return false; }
		else{}
		debugConsole("GO to team bio numero  "+num);
		
		this.nbCurrentInfoPerso = 0; //On re-initialise cette valeur (on affiche toujours la bio quand on clique sur un portrait)

		var titleTemp = this.elem.find(".slide:eq("+num+") h1").html() ; //on recupere le title (nom de la personne)
		var srcImgTemp = this.elem.find(".slide:eq("+num+") img").attr('src') ; //on recupere le chemin vers le portrait
		var textTemp = this.elem.find(".slide:eq("+num+") div:eq("+this.nbCurrentInfoPerso+")").html() ; //on recupere le test de la bio ou des qualification en fonction du sous menu actif

		/*Scenario sur le title:
			on va masquer le titre h1 comme si un masque vient depuis la droite
			Une fois qu'il masqu� ou change le par le nouveau h1
			On affiche le titre en fesant partir ce masque vers la droite (comme si on ouvr� un rideau)
		------------------------------------------------------------------------*/
			var BoxH1cssDeb = { "width" :this.elem.find(".rendu div:eq(0)").width() };			
			this.elem.find(".rendu .box")
				.animate({
						width  : '0', left : '0'
				} , 800
				, function(){
					//Toutes les animations sont fini
					//alert("fini");	
				})
				// ajout � la queue d'une fonction
				.queue(function(){
					$(this).html("<h1>"+titleTemp+"</h1>");
					$(this).dequeue();
				})
				.animate(BoxH1cssDeb, 800)
				;
			
		/*Scenario sur le texte__:
			Le texte va disparaitre en slideUp
			On fait redescendre le texte en slideDown
		------------------------------------------------------------------------*/		
			this.elem.find(".rendu div:eq(1)").slideUp(800, function() {

				$(this).html(textTemp);
				$(this).slideDown(800);
				return true;
			});

		/*Scenario sur le portrait__:
			Le portrait va disparaitre en slidant vers le haut
			Pendant qu'il disparait l'ombre s'estompe en fadeOut
			On change l'image du portrait pendant qu'elle est invisible
			On fait redescendre le portrait 
			pendant la redescente l'ombre apparait en fadeIn
		------------------------------------------------------------------------*/
			/*var portraitcssFin = { "top" :"-"+$(".contenair-portrait .portrait").height()+"px" }; //position du portrait en fin de slide

			$(".contenair-portrait .portrait")
			.animate( portraitcssFin , 800
			, function(){
				//Toutes les animations sont fini
				//alert("fini");
			})
			// ajout � la queue d'une fonction
			.queue(function(){
					//Changement de l'image
					$(this).find('img').attr({
						src: srcImgTemp,
						alt: titleTemp
					});
				
				$(".contenair-portrait .ombre").fadeIn(800); //reaparition de l'ombre port�e
				$(this).dequeue();
			})
			.animate( {top  : '0px', left : '0'}, 800);
			$(".contenair-portrait .ombre").fadeOut(800); //disparation de l'ombre port� en fade out
			//*/
			
			//TEST DE leffet FLIP sur le portrait		
				if (this.directionRotation == 180){
						
					this.elem.find(".contenair-portrait .portrait img.back").attr({	src: srcImgTemp, alt: titleTemp	}); //L'image back du flip devient l'img du portrait sur lequel on a cliqu�
					//$(".contenair-portrait .portrait ").css("transform", "rotateY("+this.directionRotation+"deg)"); 
					this.elem.find(".contenair-portrait .portrait ").removeClass("flip2").addClass("flip1"); //Je prefere tout gerer en css pour cette animation
					
					this.directionRotation = 0;
				}
				else { 
				
					this.elem.find(".contenair-portrait .portrait img.front").attr({	src: srcImgTemp, alt: titleTemp	}); //L'image front du flip devient l'img du portrait sur lequel on a cliqu�
					//$(".contenair-portrait .portrait ").css("transform", "rotateY("+this.directionRotation+"deg)");  
					$(".contenair-portrait .portrait ").removeClass("flip1").addClass("flip2"); //Je prefere tout gerer en css pour cette animation
					this.directionRotation = 180;
				}
					/*
					setTimeout(function(){ 
						$(".contenair-portrait .portrait img.front").attr({	src: srcImgTemp, alt: titleTemp	});
						$(".contenair-portrait .portrait img.back ").css("z-index", "519"); 
						$(".contenair-portrait .portrait img.front ").css("z-index", "520"); 
						//$(".contenair-portrait .portrait ").css("rotateY", "(0deg)"); 
						
						},2000); //*/
			
	
        //On gere la classe active pr la navigation des personnage__:
			this.elem.find(".nav-team-bio a").removeClass("active");
			this.elem.find(".nav-team-bio a:eq("+(num)+")").addClass("active");
			
		//On gere la classe active pr la navigation du sous menu des personnage:
			this.elem.find(".rendu ul a").removeClass("active");
			this.elem.find(".rendu ul a:eq("+(0)+")").addClass("active");

        this.nbCurrent = num;
		this.elemCurrent = this.elem.find(".slide:eq("+num+")");
		
		return true;
    },
    
    next : function(){
        var num  = this.nbCurrent+1;
        if(num  >=this.nbSlide){
            num  = 0;
        }
        this.gotoTeamBio(num);
    },
    prev : function(){
		var num  = this.nbCurrent-1;
		if(num< 0){
			num= this.nbSlide-1;
		}
		else {}
		this.gotoTeamBio(num);
    },
} // END var teamBioGlobal =
//------------------------------END page teamBioGlobal ----------------------------------------------------------------------------------
/************************************************************************************************************
*																											*
*									VALUES																*
*																											*
************************************************************************************************************/
/* valuesGlobal JS */
var valuesGlobal = {

    nbSlide : 0,
    nbCurrent : null, //la personne/portrait affich� en cour
    elemCurrent : null,
    elem : null,
	pagination : false, //Si on affiche ou pas la pagination
	resetPage : false,
	classColor_A : new Array(),

    init : function(elem, pagination, resetPage){
	
		//Tableau qui va contenit les couleurs_:
		  this.classColor_A["excellence"]='d75366';
		  this.classColor_A["unity"]='6bbc9c';
		  this.classColor_A["holism"]='8f6fad';
		  this.classColor_A["innovation"]='539cc7'; // ancien bleu 5793bs 
		  this.classColor_A["audaciousness"]='ec6857';
		  
		this.pagination=pagination;
		this.resetPage=resetPage;
        this.nbSlide = elem.find(".slide").length;
		debugConsole("il y a "+  this.nbSlide+" values !");

        /* Ecoute du click sur le menu des values__:
		-----------------------------------------------*/
		if ( this.pagination == true ) {			
			elem.find(".navSec a").click(function(){ 
			
				debugConsole('afficher la values a la position : '+$(this).parent().index(this[0]) );
				valuesGlobal.gotoValues( $(this).parent().index(this[0]) );
				return false;
			})
		}
		else{}

        // Initialisation du valuesGlobal
		this.elem=elem;
        this.elem.find(".navSec a:first").addClass("active");	

		var classColor_ATemp = this.classColor_A; // pour pouvoir l'utiliser ci dessous
		elem.find(".navSec a").mouseout(function(){
			
			//$(this).find("a").css( "color", "#" );
			var numTemp = $(this).parent().index(this[0]);
			
			//On reviens a la couleur d'origine uniquement si la values nest pas la values active
			if (numTemp !=  valuesGlobal.nbCurrent){
				$(this).animate({"color":"#ae9e8d"}, 350);
			}
			else{}			
		}).mouseover(function(){
			
			//$(this).css( "color", "#ae9e8d" );
			
			var numTemp = $(this).parent().index(this[0]);
			var classValue = elem.find(".slide:eq("+numTemp+") p").attr('class') ; //on recupere la classe
			var codeCouleur = classColor_ATemp[classValue];
		
			$(this).animate({"color":"#"+codeCouleur}, 350);
		});//*/
		
		
		if ( this.resetPage == true ){
		
		}
		else{}
    },
	// -->Fonction qui s'execute lorsque l'on quite la page values :
	goOutPageValues : function(){
			this.nbCurrent = null;//on supprime de la m�moire le slide dans lesquel on ce trouve
			this.elem.find(".navSec a").css( "color", "#ae9e8d" );
			this.elem.find(".sphere p ").remove(); //on masque le texte affich�
			this.elem.find(".phenix").show(); //on affiche le fenix
			this.elem.find(".sphere").css( "background-color", "#FFF" );//on colorie le fond de blanc
	},
    gotoValues : function(num){

        if(num==this.nbCurrent){ return false; }
		else{}
		debugConsole("GO to values numero  "+num);
		
		var textP = this.elem.find(".slide:eq("+num+")").html() ; //on recupere le title (nom de la personne)
		var classValue = this.elem.find(".slide:eq("+num+") p").attr('class') ; //on recupere la classe
		var codeCouleur = this.classColor_A[classValue];
		var elementTemp = this.elem;
		var sphereHeight = this.elem.find(".sphere").height(); //Hauteur de la sphere
		
		debugConsole("values classe  "+classValue+" code couleur "+  codeCouleur);
		
		
		if (this.nbCurrent == null) {
			//Aucune value n'est affich�e on masque juste le bird
			 this.elem.find(".phenix").fadeOut(500, function(){
			
					//Toutes les animations sont fini
					elementTemp.find(".sphere")
						.animate({
								"background-color" :  '#'+codeCouleur
						} , 500
						, function(){
							//Toutes les animations sont fini
							//alert("fini");
							
						})
						// ajout � la queue d'une fonction
						.queue(function(){
							$(this).append(textP);
							elementTemp.find(".sphere p ").hide().fadeIn(100);
							
							var paragrapheHeight = elementTemp.find(".sphere p").height();							
							var marginTop = (sphereHeight - paragrapheHeight) / 2;
							elementTemp.find(".sphere p ").css( "margin", marginTop+"px 0 0 0" );
							
							$(this).dequeue();
						});
					
			});			
		}
		else{
			//On masque la value courante 
			//On supprimer la values
			//puis on fait apparaitre et disparaitre le bird
			//Ensuite on met le fond de couleur sur la shere
			//On fait apparaitre le texte
			
			this.elem.find(".sphere p").fadeOut(500, function(){
			
				$(this).remove();
			
				//elementTemp.find(".sphere").css( "background-color", "#fff" );
				//elementTemp.find(".sphere").animate({"background-color" :  '#fff'} , 50);
				
				
				//elementTemp.find(".phenix").fadeIn(600).fadeOut(300, function(){ //suppression du passage par le phenix

					//Toutes les animations sont fini
					elementTemp.find(".sphere")
						.animate({
								"background-color" :  '#'+codeCouleur
						} , 300
						, function(){
							//Toutes les animations sont fini
							//alert("fini");
							
						})
						// ajout � la queue d'une fonction
						.queue(function(){
							$(this).find("p").remove();
							$(this).append(textP);
							elementTemp.find(".sphere p ").hide().fadeIn(100);
							
							var paragrapheHeight = elementTemp.find(".sphere p").height();
								//debugConsole("hauteur paragraphe  "+paragrapheHeight+" px ");
							var marginTop = (sphereHeight - paragrapheHeight) / 2;
							elementTemp.find(".sphere p ").css( "margin", marginTop+"px 0 0 0" );
							
							$(this).dequeue();
						});
					
				//});
			});			
		}

        //On gere la classe active pr la navigation__:
			this.elem.find(".navSec a").css( "color", "#ae9e8d" );
			this.elem.find(".navSec a:eq("+(num)+")").css( "color", "#"+codeCouleur);

        this.nbCurrent = num;
		this.elemCurrent = this.elem.find(".slide:eq("+num+")");
		
		return true;
    },
    
    next : function(){
        var num  = this.nbCurrent+1;
        if(num  >=this.nbSlide){
            num  = 0;
        }
        this.gotoValues(num);
    },
    prev : function(){
		var num  = this.nbCurrent-1;
		if(num< 0){
			num= this.nbSlide-1;
		}
		else {}
		this.gotoValues(num);
    },
} // END var valuesGlobal =
//------------------------------END page valuesGlobal ----------------------------------------------------------------------------------
/************************************************************************************************************
*																											*
*									ENDORSEMENTS															*
*																											*
************************************************************************************************************/
/* endorsementsGlobal JS */
var endorsementsGlobal = {

    nbSlide : 0,
    nbCurrent : null, //numero absolu sur de l'endorsement affich� (en cours)
    elemCurrent : null,
    elem : null,
	colorBigQuote:'BCBCBC', //La couleur active de la big quote
	numEqSvg: null, //la place absolute du rond dans les noeuds de l'image svg
	positionEndorsement_A : new Array(), //Tableau qui va contenir les positions des ronds � colori� et leur classe
	groupEndorsement_A : new Array(),  //Tableau qui va contenir les differents groupe

    init : function(elem){
	
		//Le diffenrents groupes d'endorsement avec leur code couleur (meme tableau que pour our services)
			this.groupEndorsement_A['facilitation-team-development']=new Array('72ade5', 'Facilitation, <br />Team & Group Development');
			this.groupEndorsement_A['executive-coaching']=new Array('57bdc9', 'Executive Coaching'); //
			this.groupEndorsement_A['communication-management']=new Array('b4c334', 'Communication, Management & Leadership Skills');
			this.groupEndorsement_A['change-management-consultancy']=new Array('eda43b', 'Change Management & Consultancy');
			this.groupEndorsement_A['vision-mission-definition']=new Array('a43a6a', 'Vision & Mission Definition');
	
	    this.nbSlide = elem.find(".slide").length;
		debugConsole("il y a "+  this.nbSlide+" endorsements !");
		
		//les position des points a colori (ce tableau est desormais cr�� de mani�re dynamique)
		/*
			//Premiers endorsement statique
			this.positionEndorsement_A["23"]= new Array('facilitation-team-development', '0'); 
			this.positionEndorsement_A["31"]=new Array('facilitation-team-development', '1'); 
			this.positionEndorsement_A["109"]=new Array('facilitation-team-development', '2'); 
			this.positionEndorsement_A["216"]=new Array('executive-coaching', '3');
			this.positionEndorsement_A["235"]=new Array('executive-coaching', '4');
			this.positionEndorsement_A["152"]=new Array('executive-coaching', '5');
			this.positionEndorsement_A["63"]=new Array('communication-management', '6');
			this.positionEndorsement_A["100"]=new Array('communication-management', '7');
			this.positionEndorsement_A["237"]=new Array('communication-management', '8');
			this.positionEndorsement_A["154"]=new Array('change-management-consultancy', '9');
			this.positionEndorsement_A["192"]=new Array('change-management-consultancy', '10');
			this.positionEndorsement_A["251"]=new Array('change-management-consultancy', '11');
			this.positionEndorsement_A["202"]=new Array('vision-mission-definition', '12');
			this.positionEndorsement_A["59"]=new Array('vision-mission-definition', '13');
			this.positionEndorsement_A["47"]=new Array('vision-mission-definition', '14');
		//*/
		
		/* Recherche des endorsements dans la page html 
		- on extrait leur position dans la quote ET leur service
		- Va constituer un tableau pour savoir quels sont les point a colorier et le service associ�
		------------------------------------------------------------------------------------------------*/
		var i = 0;
			elem.find(".slide").each(function(){
				//alert( $(this).attr('endorsementservice') );
					endorsementsGlobal.positionEndorsement_A[$(this).attr('endorsementnumberquote')]= new Array($(this).attr('endorsementservice') , i); 
					i++;
			});
			//alert( endorsementsGlobal.positionEndorsement_A );
			
		var elementShape = elem.find("#Calque_2 g g path"); //on recupere la page courante
		/*Sert a detecter sur quel element on clique (leur position par rapport � leur frere)
		- Ecouteur au click sur un rond
		------------------------------------------------------------------------------------------------*/
			elementShape.click(function(){ 
			
				endorsementsGlobal.numEqSvg =  $(this).index(this[0]) ;				
				//debugConsole( "Position du point "+endorsementsGlobal.numEqSvg );
				
				//Si le point est enregistr� dans le tableau on peut lanc� l'affichage de l'endorsement
				var foo = endorsementsGlobal.positionEndorsement_A[endorsementsGlobal.numEqSvg];
				
				if (  foo !== null && typeof (foo) !== 'undefined' ){
					//alert(foo);
							
					endorsementsGlobal.gotoEndorsements( endorsementsGlobal.positionEndorsement_A[endorsementsGlobal.numEqSvg][1] );
				}
				else{}
				return false;
			})
		
		/* On va colorier les ronds determin�s dans un tableau avec la couleur de leur groupe
		-----------------------------------------------------------------------------------------------*/
			for (var ii in this.positionEndorsement_A){
				//Chaine += tableau[i]+' ';
				elem.find("#Calque_2 g g path:eq("+ii+")").attr('fill',"#"+this.groupEndorsement_A[ this.positionEndorsement_A[ii][0] ][0]);
				elem.find("#Calque_2 g g path:eq("+ii+")").attr('class',"pointer");
				elem.find("#Calque_2 g g path:eq("+ii+")").addClass("pointer");
			}

		/* On va colorier progressivement la big quotte de la m�me couleur que l'endorsement charg�
		-------------------------------------------------------------------------------------------------- */
			var positionFisrtEndorsement = elem.find(".slide :eq(0)").attr('endorsementnumberquote'); //on recupere la position sur la quotte du premier endorsement
			//alert(positionFisrtEndorsement);					
			var couleurBigQuoteTemp = this.groupEndorsement_A[ this.positionEndorsement_A[positionFisrtEndorsement][0] ][0];
			elem.find(".quote path:eq(0)").animate({svgFill: "#"+couleurBigQuoteTemp}, 1000);

        // Initialisation du endorsementsGlobal
		this.elem=elem;
        //this.elem.find(".navSec a:first").addClass("active");	 //pas besoin car rien de selectionn� par defaut
	
		/*Evenement on mouse over et on mouse out sur les rond de couleur
		----------------------------------------------------------------------------------*/
			elementShape.mouseout(function(){
						
				var numAbsolute =  $(this).index(this[0]) ;
				var foo = endorsementsGlobal.positionEndorsement_A[numAbsolute];
					
				//On lance la suite que si le rond quitt� et un rond actif (cest pour economis� des ressources)
				if (  foo !== null && typeof (foo) !== 'undefined' )
				{
					var groupSurvol = endorsementsGlobal.positionEndorsement_A[numAbsolute][0]; //on recupere le groupe survole
					
					//On colorie la big quote de sa derniere couleur fixe
					endorsementsGlobal.elem.find(".quote path:eq(0)").animate({svgFill: "#"+endorsementsGlobal.colorBigQuote}, 250);
		
					for (var i in endorsementsGlobal.positionEndorsement_A)
					{
						//Si le point trouve nest pas du mm groupe que celui trouv� on va eteindre sont point 
						if ( endorsementsGlobal.positionEndorsement_A[i][0] != groupSurvol ) {
							endorsementsGlobal.elem.find("#Calque_2 g g path:eq("+i+")").animate({svgFill: "#"+endorsementsGlobal.groupEndorsement_A[ endorsementsGlobal.positionEndorsement_A[i][0]][0]}, 300);
						}
						else{}
					}
					
					//On supprime le nom de lelement dans la big quote
					endorsementsGlobal.elem.find(".quote h4").remove();
				}
				else{}			
			}).mouseover(function(){
				
				var numAbsolute =  $(this).index(this[0]) ;
				var foo = endorsementsGlobal.positionEndorsement_A[numAbsolute];
				
				//On lance la suite que si le rond survol� et un rond actif (cest pour economis� des ressources)
				if (  foo !== null && typeof (foo) !== 'undefined' )
				{
					var groupSurvol = endorsementsGlobal.positionEndorsement_A[numAbsolute][0]; //on recupere le groupe survole
				
					//On colori la big quote de la couleur du groupe survole
					endorsementsGlobal.elem.find(".quote path:eq(0)").animate({svgFill: "#"+endorsementsGlobal.groupEndorsement_A[ groupSurvol ][0]}, 250);
		
						//On recherche tous les point a griser
						for (var i in endorsementsGlobal.positionEndorsement_A)
						{
							//Si le point trouve nest pas du mm groupe que celui trouv� on va eteindre sont point 
							if ( endorsementsGlobal.positionEndorsement_A[i][0] != groupSurvol ) {
								endorsementsGlobal.elem.find("#Calque_2 g g path:eq("+i+")").animate({svgFill: "#BCBCBC"}, 250);
							}
							else{}
						}

					//On affiche dans la big quote la nom du groupe :
					endorsementsGlobal.elem.find(".quote").append("<h4>"+endorsementsGlobal.groupEndorsement_A[ groupSurvol ][1]+"</h4>");
					
					var quoteHeight = endorsementsGlobal.elem.find(".quote").height();							
					var quoteH4Height = endorsementsGlobal.elem.find(".quote h4").height();							
					var marginTop = (quoteHeight - quoteH4Height) / 1.6;
					endorsementsGlobal.elem.find(".quote h4").css( "margin-top", marginTop+"px" );
				}
				else{}
			});//*/
			
		/*Cr�ation des fleches suivante et precedente__:
		------------------------------------------------------------*/	
			elem.find('.content').append('<div class="navigationRight"><span> RIGHT </span></div>');
			elem.find(".navigationRight").click(function(){ endorsementsGlobal.next(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			//elem.find(".navigationRight span").click(function(){ endorsementsGlobal.next(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...

			elem.find('.content').append('<div class="navigationLeft"><span> LEFT </span></div>');
			elem.find(".navigationLeft").click(function(){ endorsementsGlobal.prev(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
			//elem.find(".navigationLeft span").click(function(){ endorsementsGlobal.prev(); }) //grace a ca on peut s'affranchir de l'id #slide1, #slide2 etc...
    },
    gotoEndorsements : function(num){

        if(num==this.nbCurrent){ return false; }
		else{}
		debugConsole("GO to endorsement numero  "+num);
		
		var textP = this.elem.find(".slide:eq("+num+")").html() ; //on recupere le contenu html de l'endorsement

		this.elem.find(".rendu").fadeOut(500, function(){
			$(this).html(textP);
			$(this).fadeIn(800);
			return true;
		});
		
        //On colorie la big quote de la couleur du groupe
			var groupActif = this.positionEndorsement_A[this.numEqSvg][0]; //
			var couleurBigQuote = this.groupEndorsement_A[ groupActif ][0];
			this.elem.find(".quote path:eq(0)").animate({svgFill: "#"+couleurBigQuote}, 250);
		
        this.colorBigQuote = couleurBigQuote;
        this.nbCurrent = parseInt(num);
		this.elemCurrent = this.elem.find(".slide:eq("+num+")");
		
		return true;
    },
    
    next : function(){
        var num  = this.nbCurrent+1;
		//debugConsole("courant : "+this.nbCurrent+"; Total :"+this.nbSlide+"; Aller au "+num);
		if(num  >=this.nbSlide){
            num  = 0;
        }
		
		//On recherche la position absolute du rond de couleur
			for (var i in this.positionEndorsement_A){
				
				if (this.positionEndorsement_A[i][1] == num) {
					this.numEqSvg = i;
				}
				else{}
			}
		
        this.gotoEndorsements(num);
    },
    prev : function(){
		var num  = this.nbCurrent-1;
		if(num< 0){
			num= this.nbSlide-1;
		}
		else {}
		
		//On recherche la position absolute du rond de couleur
			for (var i in this.positionEndorsement_A){
				
				if (this.positionEndorsement_A[i][1] == num) {
					this.numEqSvg = i;
				}
				else{}
			}
			
		this.gotoEndorsements(num);
    },
} // END var endorsementsGlobal =
//------------------------------END page endorsementsGlobal ----------------------------------------------------------------------------------
/************************************************************************************************************
*																											*
*									OUR SERVICES															*
*																											*
************************************************************************************************************/
/* servicesGlobal JS */
var servicesGlobal = {

    nbSlide : 0,
    nbCurrent : null, //numero de service (place dom) sur lequel la personne a clique
    elemCurrent : null,
    elem : null,
	
	groupService_A : new Array(),  //Tableau qui va contenir les differents groupe

    init : function(elem){
	
		// Initialisation du 
		this.elem=elem;
		
		//Le diffenrents groupes d'endorsement avec leur code couleur (meme tableau que pour endorsement)
			this.groupService_A['facilitation-team-development']=new Array('72ade5', 'Facilitation, Team & Group Development');
			this.groupService_A['executive-coaching']=new Array('57bdc9', 'Executive Coaching'); //
			this.groupService_A['communication-management']=new Array('b4c334', 'Communication, Management & Leadership Skills');
			this.groupService_A['change-management-consultancy']=new Array('eda43b', 'Change Management & Consultancy');
			this.groupService_A['vision-mission-definition']=new Array('a43a6a', 'Vision & Mission Definition');

        this.nbSlide = elem.find(".slide").length;
		debugConsole("il y a "+  this.nbSlide+" services !");
		
		/*Sert a detecter sur quel service l'internaute clique pour voir les details
		- Ecouteur au click sur un services
		------------------------------------------------------------------------------------------------*/		
		elemMenuService = elem.find(".navOurServices a");
			elemMenuService.click(function(){ 
			
				debugConsole('afficher le service a la position : '+$(this).parent().index(this[0]) );
				servicesGlobal.gotoServices( $(this).parent().index(this[0]) );
				return false;
			});
        //this.elem.find(".navSec a:first").addClass("active");	 //pas besoin car rien de selectionn� par defaut
	
		/*Evenement on mouse over et on mouse out sur le menu des services
		----------------------------------------------------------------------------------*/
			elemMenuService.mouseout(function(){
				$(this).animate({color: "#959595"}, 600);
			}).mouseover(function(){
				var idTemp = $(this).attr('href').replace(/^#/, ''); //suppression de "#" au debut de l'ancre; //on recupere le lien qui est l'id/la classe de l'element
				$(this).animate({color: "#"+servicesGlobal.groupService_A[idTemp][0]}, 250);
			});//*/
			
		/*On affiche les services__:
		----------------------------------------------------*/
			//this.elem.find(".slide").fadeIn(750); //desactive ici on le fait dans la fonction qui fait arriv� les pages		
    },
	goOutPage: function(){
		debugConsole('on sort de la page our services');
		this.elem.find(".slide .rendu").hide();
		this.nbCurrent = null;
	},
    gotoServices : function(num){
			
			
        if(num==this.nbCurrent){ return false; }
		else{}
		debugConsole("GO to service numero  "+num);
		

		//var idTemp = this.elem.find(".slide:eq("+num+")").attr('href'); //on recupere l'id vers lequel il faut scroller
		
		//Peut etre virer le if et ne garder que ce qui est dans le else 
		/*
		if(this.elem.find(".slide:eq("+num+")").offset().top < $(document).height()-$(window).height()){
			var dest=$(document).height()-$(window).height();
			//alert("ici");
		}else{
			var dest =  this.elem.find(".slide:eq("+num+")").offset().top;
			dest = dest-$("#header").height(); //on enleve la taille du header
			dest = dest+$('#containair').scrollTop(); //On ajoute le scrool deja parcouru pour eviter certain decalage
			//alert( $('#containair').scrollTop( ) );
		}//*/
				
		if ($('#containair').scrollTop()==0){
			var dest =  this.elem.find(".navOurServices").offset().top;
			dest = dest-$("#header").height(); //on enleve la taille du header
			dest = dest+$('#containair').scrollTop(); //On ajoute le scrool deja parcouru pour eviter certain decalage
				
			$('#containair').animate({scrollTop:dest}, 1000,'swing'); //swing, easeOutExpo
			//alert(dest);
		}
		else{}/**/
		
		var textP = this.elem.find(".slide:eq("+num+")").html(); 
	
		
		if (this.nbCurrent == null){
			this.elem.find(".rendu").html(textP).fadeIn(1000,'easeInCubic',function(){
			   //callback
				servicesGlobal.ecouteurSousMenu();
			});
		}
		else{
			this.elem.find(".rendu").fadeOut(500,'easeOutCubic',function(){
			   //callback
			   $(this).html(textP).fadeIn(1000,'easeInCubic',function(){
				
					servicesGlobal.ecouteurSousMenu();
					
			   });
			});
		}
        this.nbCurrent = num;
		this.elemCurrent = this.elem.find(".slide:eq("+num+")");
		return true;
    },
    ecouteurSousMenu : function (){
		var elemSsMenuCaseStudies =this.elem.find(".rendu a");
		elemSsMenuCaseStudies.click(function(){ 	
				var idTemp = $(this).attr('href').replace(/^#/, ''); //suppression de "#" au debut de l'ancre; //on recupere le lien qui est l'id/la classe de l'element
				var positionCaseStudies =	$('#case-studies div[casestudies='+idTemp+']').index(0); //Avec cette methode on recupere dynamiquement la position de la case studie (par rapport a ses freres)
				debugConsole('afficher le case studies a la position : '+positionCaseStudies );
				phoenixObsidian.gotoPage(4,  "'"+positionCaseStudies+"'"); //premier argument la page (case studies), second argument le case studies qui est cibl�
				return false;
		});
		return true;
	},
    next : function(){
        var num  = this.nbCurrent+1;
        if(num  >=this.nbSlide){
            num  = 0;
        }
        this.gotoServices(num);
    },
    prev : function(){
		var num  = this.nbCurrent-1;
		if(num< 0){
			num= this.nbSlide-1;
		}
		else {}
		this.gotoServices(num);
    },
} // END var servicesGlobal =
//------------------------------END page servicesGlobal ----------------------------------------------------------------------------------
/************************************************************************************************************
*																																																	*
*									CASE STUDIES																																			*
*																																																	*
************************************************************************************************************/
/* caseStudiesGlobal JS */
var caseStudiesGlobal = {

    nbSlide : 0,
    nbCurrent : null, //numero de service (place dom) sur lequel la personne a clique
    elemCurrent : null,
    elem : null,
	groupCaseStudies_A : new Array(),  //Tableau qui fait la laison entre les case studies et leur code couleur
	
    init : function(elem){
	
		// Initialisation du 
		this.elem=elem;	

        this.nbSlide = elem.find(".slide").length;
		debugConsole("il y a "+  this.nbSlide+" case studies !");


		caseStudiesGlobal.groupCaseStudies_A['altana-pharma']=new Array('d86284'); //
		caseStudiesGlobal.groupCaseStudies_A['offshore-drilling-multinational']=new Array('e36432');
		caseStudiesGlobal.groupCaseStudies_A['novartis']=new Array('4196c9');
		caseStudiesGlobal.groupCaseStudies_A['givenchy']=new Array('68b091');
		caseStudiesGlobal.groupCaseStudies_A['citigroup']=new Array('76599b');

		
		/*Sert a detecter sur quel service l'internaute clique pour voir les details
		- Ecouteur au click sur un services
		------------------------------------------------------------------------------------------------*/		
		elemMenuCaseStudies = elem.find(".navTitle");
		elemMenuCaseStudies.css("cursor","pointer");
		
			elemMenuCaseStudies.click(function(){ 
				//debugConsole('afficher le service a la position : '+$(this).parent().index(this[0]) );				
				caseStudiesGlobal.gotoCaseStudies( $(this).parent().index(this[0]) );
				return false;
			})
        //this.elem.find(".navSec a:first").addClass("active");	 //pas besoin car rien de selectionn� par defaut
		
		/* Va colorier la quote de la couleur de la case en question
		- 
		------------------------------------------------------------------------------------------------*/		
			this.elem.find(".slide").each(function(){
					var idTemp = $(this).attr('casestudies'); //suppression de "#" au debut de l'ancre; //on recupere le lien qui est l'id/la classe de l'element
					//$(this).find('.quote span.1, .quote span.2').css({color: "#"+caseStudiesGlobal.groupCaseStudies_A[idTemp][0]}, 200);
					$(this).find('.quote').css({color: "#"+caseStudiesGlobal.groupCaseStudies_A[idTemp][0]}, 200); //on colorie toutes la quote
			});	
		/*Evenement on mouse over et on mouse out sur le menu des services
		----------------------------------------------------------------------------------*/
			elemMenuCaseStudies.mouseleave(function(){
				//alert(  $(this).parent().index(this[0]) +" "+caseStudiesGlobal.nbCurrent );
				 if ( $(this).parent().index(this[0]) != caseStudiesGlobal.nbCurrent ){
					$(this).find('h2').animate({color: "#686767"}, 350);
				}
				else{	//alert('on laisse la couleur');
				}
			}).mouseover(function(){
				//var idTemp = $(this).attr('href').replace(/^#/, ''); //suppression de "#" au debut de l'ancre; //on recupere le lien qui est l'id/la classe de l'element
				var idTemp = $(this).parent().attr('casestudies'); //suppression de "#" au debut de l'ancre; //on recupere le lien qui est l'id/la classe de l'element
				//alert(idTemp);
				$(this).find('h2').animate({color: "#"+caseStudiesGlobal.groupCaseStudies_A[idTemp][0]}, 200);
			});//*/
			

			
		/*On affiche les services__:
		----------------------------------------------------*/
			//this.elem.find(".slide").fadeIn(750); //desactive ici on le fait dans la fonction qui fait arriv� les pages
		
		
		/*Sert a detecter sur quelle case studies l'internaute a cliquer pour ensuite rediriger vers la page
		- Ecouteur au click sur un case studies
		------------------------------------------------------------------------------------------------*/		
		elemSsMenuGoServices = elem.find(".usedServices a");
		elemSsMenuGoServices.click(function(){ 
		
			var idTemp = $(this).attr('href').replace(/^#/, ''); //suppression de "#" au debut de l'ancre; //on recupere le lien qui est l'id/la classe de l'element
			var positionService =	$('#our-services div[id='+idTemp+']').index(0); //Avec cette methode on recupere dynamiquement la position de la case studie (par rapport a ses freres)
			debugConsole('afficher le service a la position : '+positionService );
			//alert(positionService);
			phoenixObsidian.gotoPage(3, "'"+positionService+"'" ); //premier argument la page (services), second argument le service qui est cibl�
			return false;
		})
    },
	goOutPage: function(){
		debugConsole('on sort de la page case studies');
		this.elem.find(".slide .detail").slideUp(100);
		this.elem.find(".slide h2").css({color: "#686767"});
		this.nbCurrent = null;
	},
    gotoCaseStudies: function(num){

		var chaine=num
		var reg=new RegExp("'([0-9])*'", "i");
		//document.write("Cha�ne d'origine : " + chaine + "<BR>");
		var nummm =  reg.exec(chaine);
		if (nummm) { // On v�rifie que ce n'est pas null
			num = nummm[1];
		}
		else {
			nummm = '1111111';
		}
		
		//alert(num+" ici "+ nummm[1]);
		//alert(num+" ici "+ caseStudiesGlobal.nbCurrent);
        if(num==caseStudiesGlobal.nbCurrent){ 
			
			this.elem.find(".slide:eq("+num+") .detail").slideUp(2000,'easeOutCubic',function(){
			   //callback
			   debugConsole("On ferme la case studie courante "+caseStudiesGlobal.nbCurrent);
				caseStudiesGlobal.elem.find(".slide:eq("+num+") h2").animate({color: "#686767"}, 350);
			   caseStudiesGlobal.nbCurrent = null;   
			});
			
			return false;	
		}
		else{}
		debugConsole("GO to case studies "+num);
		

		/*
		var idTemp = this.elem.find(".slide:eq("+num+")").attr('href'); //on recupere l'id vers lequel il faut scroller
		//Peut etre virer le if et ne garder que ce qui est dans le else 
		if(this.elem.find(".slide:eq("+num+")").offset().top < $(document).height()-$(window).height()){
			var dest=$(document).height()-$(window).height();
			//alert("ici");
		}else{
			var dest =  this.elem.find(".slide:eq("+num+")").offset().top;
			dest = dest-$("#header").height(); //on enleve la taille du header

			dest = dest+$('#containair').scrollTop(); //On ajoute le scrool deja parcouru pour eviter certain decalage
			//alert( $('#containair').scrollTop( ) );
		}
		$('#containair').animate({scrollTop:dest}, 1000,'swing'); //swing, easeOutExpo
		//alert(dest);
		//*/

		//this.elem.find(".slide .detail").toggle("500");
		//this.elem.find(".slide:eq("+num+") .detail").toggle();
		
		//On ferme tous les case studies
		//this.elem.find(".slide:lt("+num+") .detail").slideUp(1500,'easeInOutCubic',function(){
		this.elem.find(".slide .detail").slideUp(900,'easeInOutCubic',function(){
		   //callback
		});
		
		//On ouvre le case studies demande
		this.elem.find(".slide:eq("+num+") .detail").slideDown(1400,'easeOutCubic',function(){
		   //callback
		   
			var dest=$(this).offset().top;
			dest = dest-$("#header").height(); //on enleve la taille du header
			dest = dest+$('#containair').scrollTop(); //On ajoute le scrool deja parcouru pour eviter certain decalage
			dest = dest-105; //on retire la taille du titre de la case studies pour que l'internaute puisse la voir.
			//alert(dest);
			$('#containair').animate({scrollTop:dest}, 800,'swing'); //swing, easeOutExpo
		
		
		});
		//http://jqueryui.com/effect/#easing
		//pour voir tous les effets easing : http://easings.net/fr#
		
		//on va colorier le titre case studies de la couleur demand�
		this.elem.find(".slide h2").css({color: "#686767"});
		
		var idTemp = this.elem.find(".slide:eq("+num+")").attr('casestudies');
		this.elem.find(".slide:eq("+num+") h2").css({color: "#"+caseStudiesGlobal.groupCaseStudies_A[idTemp][0]}, 400);
	
        caseStudiesGlobal.nbCurrent = num;
		this.elemCurrent = this.elem.find(".slide:eq("+num+")");
		
		return true;
    },
    
    next : function(){
        var num  = this.nbCurrent+1;
        if(num  >=this.nbSlide){
            num  = 0;
        }
        this.gotoCaseStudies(num);
    },
    prev : function(){
		var num  = this.nbCurrent-1;
		if(num< 0){
			num= this.nbSlide-1;
		}
		else {}
		this.gotoCaseStudies(num);
    },
} // END var caseStudiesGlobal =
//------------------------------END page caseStudiesGlobal ----------------------------------------------------------------------------------