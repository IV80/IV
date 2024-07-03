// scripts/friends.js
document.addEventListener('DOMContentLoaded', function() {
    const referralLink = document.getElementById('referralLink');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const friendsCountElement = document.getElementById('friendsCount');
    let friendsCount = getCookie('friendsCount') ? parseInt(getCookie('friendsCount')) : 0;
    let referralBonus = getCookie('referralBonus') ? parseFloat(getCookie('referralBonus')) : 10000;

    function updateFriendsDisplay() {
        friendsCountElement.textContent = `Friends Referred: ${friendsCount}`;
    }

    function calculateReferralBonus() {
        if (friendsCount <= 12) {
            referralBonus *= 1.5;
        } else if (friendsCount <= 30) {
            referralBonus *= 1.05;
        } else {
            referralBonus = 3500000;
        }
        setCookie('referralBonus', referralBonus, 365);
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    copyLinkButton.addEventListener('click', () => {
        referralLink.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });

    function addFriend() {
        friendsCount++;
        calculateReferralBonus();
        updateFriendsDisplay();
        setCookie('friendsCount', friendsCount, 365);
        // Add coins to user's balance
    }

    updateFriendsDisplay();
});
