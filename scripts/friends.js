// scripts/friends.js
document.addEventListener('DOMContentLoaded', () => {
    const referralLink = document.getElementById('referralLink');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const friendsCount = document.getElementById('friendsCount');

    let state = {
        friendsCount: JSON.parse(localStorage.getItem('friendsCount')) || 0,
    };

    function saveState() {
        localStorage.setItem('friendsCount', JSON.stringify(state.friendsCount));
    }

    function updateUI() {
        friendsCount.textContent = state.friendsCount;
        referralLink.value = `https://example.com/referral?code=XYZ123`;
    }

    copyLinkButton.addEventListener('click', () => {
        referralLink.select();
        document.execCommand('copy');
        alert('Referral link copied to clipboard!');
    });

    updateUI();
});
