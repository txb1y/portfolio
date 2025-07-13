from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters, ConversationHandler
import smtplib
from email.mime.text import MIMEText

# Email credentials (App Password)
GMAIL_USER = "xetoby@gmail.com"
GMAIL_PASS = "vrloucktaqdcbxus"

# Bot stages
RECIPIENTS, SUBJECT, BODY = range(3)
user_data = {}

# Start command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "<b>Welcome! to Email Bot</b> – <i>Crafted by Bharathi.</i>\n\n"
        "📤 <b>/send</b> — Instantly send a single, sharp message\n"
        "📨 <b>/bulk</b> — Effortlessly blast emails to multiple people\n\n"
        "<i>Just tap a command above to begin your journey!</i>\n\n"
        "💡 <b>Tip:</b> You can cancel anytime with /cancel.\n\n"
        "Let’s make your inbox work for you! 🚀"
    , parse_mode="HTML")

# /send command
async def send(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_data['bulk'] = False
    await update.message.reply_text("Please enter the recipient's email address:")
    return RECIPIENTS

# /bulk command
async def bulk(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_data['bulk'] = True
    await update.message.reply_text("Please enter recipient email addresses separated by commas:")
    return RECIPIENTS

# Collect recipient(s)
async def get_recipients(update: Update, context: ContextTypes.DEFAULT_TYPE):
    emails = update.message.text.strip()
    user_data['recipients'] = [email.strip() for email in emails.split(',')]
    await update.message.reply_text("Enter the subject of the email:")
    return SUBJECT

# Collect subject
async def get_subject(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_data['subject'] = update.message.text
    await update.message.reply_text("Enter the body of the email:")
    return BODY

# Collect body and send
async def get_body(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_data['body'] = update.message.text

    try:
        msg = MIMEText(user_data['body'])
        msg['Subject'] = user_data['subject']
        msg['From'] = GMAIL_USER
        msg['To'] = ", ".join(user_data['recipients'])

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(GMAIL_USER, GMAIL_PASS)
            server.send_message(msg)

        await update.message.reply_text("✅ Email successfully sent!")
    except Exception as e:
        await update.message.reply_text(f"❌ Failed to send email:\n{str(e)}")
    return ConversationHandler.END

# Cancel
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("❌ Operation cancelled.")
    return ConversationHandler.END

# Main bot
app = ApplicationBuilder().token("7744238091:AAGfUGjap8qHSsPkyKtDlwLw7fdvBz33x7A").build()

conv_handler = ConversationHandler(
    entry_points=[CommandHandler("send", send), CommandHandler("bulk", bulk)],
    states={
        RECIPIENTS: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_recipients)],
        SUBJECT: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_subject)],
        BODY: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_body)],
    },
    fallbacks=[CommandHandler("cancel", cancel)],
)

app.add_handler(CommandHandler("start", start))
app.add_handler(conv_handler)

app.run_polling()
