(function ($) {
    "use strict";
    
    $(".goforx").click(function() {
        window.open("https://gofox.io", '_blank').focus();
    })

    function appendBlock() {
        let appendPopup = "<div id='goforx' style='display:none;width:100%'><div class='row d-flex h-100 justify-content-center align-items-center' style='margin:0;padding:20px'><div class='col-6 text-center'><img src='assets/img/logo-fox.155192d4.svg' alt='' width='300' height='300'></div><div class='col-6'><h3>NFT Gofox MarketPlace<span class='status publish'>Public</span></h3><p>Link:<a class='goforx' href='javascript(0);' target='_blank'><em>Goto Site</em></a></p><p><b>Team Size:</b>7</p><p><b>Description:</b>MarketPlace for customers can mint and sell their NFT token get a reward, and airdrop owner coin on the website to the Ethereum networks.</p><p><b>Responsibilities:</b>Main develop Solidity SmartContract in line with business requirements and deploy it to Ethereum and BSC platform. Main develop BE, integrate BE with SmartContract. Participate in developing FE features.</p><p><b>Results:</b>Community's users can mint, trade the NFT, get a reward, and airdrop owner coin on the website to the Blockchain from our marketplace.</p><p><b>Tech accomplishments:</b>learn fundamental blockchain work, &nbsp;how they storage data on blockchain network. Learing Solidity programing SmartContract, &nbsp;using Web3 library to communicate with blockchain network througt SmartContract. Learing NodeJs Express, &nbsp;MongoDb to build Backend service. Learing fundamental React e.g: inject TypeScript in React, &nbsp;Redux saga, &nbsp;React-routing, &nbsp;React-hook...</p><p><b>Technologies:</b>React TypeScript, &nbsp;Solidity smart contract, &nbsp;BlockChain, &nbsp; NodeJs, ExpressJs, React Typescript, Redis cache, Solidity, MongoDb...</p></div></div></div>";

        var parent1 = document.querySelector('.append-popup');
        if (parent1) {
            parent1.innerHTML = appendPopup
        }

        let appendBlock = "<div class='portfolio-wrap'><img src='assets/img/logo-fox.155192d4.svg' alt='NFT marketplace project, dự án sàn giao dịch NFT' width='200' height='200'><div class='portfolio-links'><a href='#goforx' data-gall='portfolioGallery' class='venobox' data-vbtype='inline' title='Website Vé máy bay'><i class='bx bx-search'></i></a><a class='goforx' title='More Details' target='_blank'><i class='bx bx-link'></i></a></div><div class='portfolio-data'><h3>NFT Gofox MarketPlace<span class='status publish'>Publish</span></h3><p><b>Description:</b>MarketPlace for customers can mint and sell their NFT token get a reward, and airdrop owner coin on the website to the EthereumGalaxyPay networks.</p><p><b>Results:</b>Community's users can mint, trade the NFT, get a reward, and airdrop owner coin on the website to the Blockchain from our marketplace.</p></div></div>";

        var parent2 = document.querySelector('.append-block');
        if (parent2) {
            parent2.innerHTML = appendBlock
        }
    }

    appendBlock()
})(jQuery);