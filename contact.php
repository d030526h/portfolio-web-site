<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $destinataire = 'edouard.desmyter@gmail.com';
    $sujet = 'Nouveau message depuis le portfolio';
    $expediteur = 'edouard.desmyter@gmail.com';
    
    $nom = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));
    
    $erreurs = [];
    if (empty($nom)) $erreurs[] = 'Nom requis';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $erreurs[] = 'Email invalide';
    if (empty($message) || strlen($message) < 10) $erreurs[] = 'Message trop court';
    
    if (empty($erreurs)) {
        $contenu = "
        <html>
        <body style='font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; line-height: 1.6;'>
            <h2 style='color: #333;'>📧 Nouveau contact portfolio</h2>
            <div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                <p><strong>👤 Nom:</strong> $nom</p>
                <p><strong>📧 Email:</strong> $email</p>
                <p><strong>💬 Message:</strong><br><br>$message</p>
            </div>
            <hr style='border: none; height: 1px; background: #eee;'>
            <small style='color: #666;'>Reçu le " . date('d/m/Y à H:i:s') . "</small>
        </body>
        </html>";
        
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: Portfolio XR <$expediteur>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        
        if (mail($destinataire, $sujet, $contenu, $headers)) {
            echo json_encode([
                'success' => true, 
                'message' => '✅ Message envoyé avec succès ! Je vous réponds rapidement.'
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([
                'success' => false, 
                'message' => '❌ Erreur envoi email (normal en local XAMPP). Contact: edouard.desmyter@gmail.com'
            ], JSON_UNESCAPED_UNICODE);
        }
    } else {
        echo json_encode([
            'success' => false, 
            'message' => implode('<br>', $erreurs)
        ], JSON_UNESCAPED_UNICODE);
    }
} else {
    echo json_encode([
        'success' => false, 
        'message' => '❌ Méthode HTTP non autorisée'
    ], JSON_UNESCAPED_UNICODE);
}
?>
