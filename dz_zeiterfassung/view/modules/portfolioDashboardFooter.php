<?php if ($isPortfolioDemo): ?>
</div> <!-- End demo-disabled wrapper -->
<?php endif; ?>

<script>
// Common JavaScript that should run on all pages
document.addEventListener('DOMContentLoaded', function() {
    // Update date and time
    function updateDateTime() {
        const now = new Date();
        const dateElement = document.getElementById('datum');
        const timeElement = document.getElementById('uhrzeit');
        
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('de-DE');
        }
        if (timeElement) {
            timeElement.textContent = now.toLocaleTimeString('de-DE');
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    <?php if ($isPortfolioDemo): ?>
    // Show initial demo reminder after a short delay
    setTimeout(() => {
        showDemoReminder(new Event('demo-init'));
    }, 1500);
    <?php endif; ?>
});
</script>
</body>
</html>
