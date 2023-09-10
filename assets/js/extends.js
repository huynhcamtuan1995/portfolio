
function goToPage() {
    window.open("https://gofox.io", '_blank').focus();
}

(function ($) {
    "use strict";
    function appendBlock() {
        let appendPopup = "<div class='col-6 text-center'><img src='assets/img/logo-fox.155192d4.svg' alt='' width='300' height='300'></div><div class='col-6'><h3>NFT Gofox MarketPlace<span class='status publish'>Public</span></h3><p>Link:<a onclick='goToPage()' href='javascript(0);' target='_blank'><em>Goto Site</em></a></p><p><b>Team Size:</b>7</p><p><b>Description:</b>Trending R&D NFT project, and build Market Place  that allow users mint  and  sell  their NFT token get a reward, and airdrop owner coin on Ethereum and BSC.</p><p><b>Responsibilities:</b>R&D off-chain backend (sync distribute, integrate RPC). Mainly R&D Smart Contract, integrate RPC Web3, DApp.Build extension for project that extend light-weight library named 'MongoDB Entities' 'https://github.com/huynhcamtuan1995/ExtendMongoDBEntities'. Participate in developing a page FE web-page.</p><p><b>Results:</b>Users mint, trade the NFT, get a reward, and airdrop owner coin on off-chain  to the Ethereum and BSC blockchain networks.</p><p><b>Tech accomplishments:</b>learn fundamental blockchain work, &nbsp;how they storage data on blockchain network. Learing Solidity programing Smart Contract, &nbsp;using Web3 library to communicate with blockchain network througt Smart Contract. Learing NodeJs Express, &nbsp;MongoDb to build Backend service. Learing fundamental React e.g: inject TypeScript in React, &nbsp;Redux saga, &nbsp;React-routing, &nbsp;React-hook...</p><p><b>Technologies:</b>React TypeScript, &nbsp;Solidity Smart Contract, &nbsp;BlockChain, &nbsp; NodeJs, ExpressJs, React Typescript, Redis cache, Solidity, MongoDb...</p></div>";

        let parent1 = document.querySelector('.append-popup');
        if (parent1) {
            parent1.innerHTML = appendPopup
        }

        let appendBlock = "<div class='portfolio-wrap'><img src='assets/img/logo-fox.155192d4.svg' alt='NFT MarketPlace project, dự án sàn giao dịch NFT' width='200' height='200'><div class='portfolio-links'><a href='#goforx' data-gall='portfolioGallery' class='venobox' data-vbtype='inline' title='NFT Gofox market place'><i class='bx bx-search'></i></a><a onclick='goToPage()' title='More Details' target='_blank'><i class='bx bx-link'></i></a></div><div class='portfolio-data'><h3>NFT Gofox MarketPlace<span class='status publish'>Publish</span></h3><p><b>Description:</b>Trending R&D NFT project, and build Market Place  that allow users mint  and  sell  their NFT token get a reward, and airdrop owner coin on Ethereum and BSC.</p><p><b>Results:</b>Users mint, trade the NFT, get a reward, and airdrop owner coin on off-chain  to the Ethereum and BSC blockchain networks.</p></div></div>";

        let parent2 = document.querySelector('.append-block');
        if (parent2) {
            parent2.innerHTML = appendBlock
        }
    }

    let isAppend = false;
    window.onscroll = function (event) {
        //
        let section = document.getElementById('projects')
        if (window.scrollY >= (section.offsetTop - (section.offsetHeight / 2.5)) && !isAppend) {
            appendBlock()
            isAppend = true
        }
    };
})(jQuery);