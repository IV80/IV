// scripts/friends.js
document.addEventListener('DOMContentLoaded', function() {
    const referralLink = document.getElementById('referralLink');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const friendsCountElement = document.getElementById('friendsCount');
    let friendsCount = 0;
    let referralBonus = 10000;

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
        // Add coins to user's balance
    }

    updateFriendsDisplay();
});
