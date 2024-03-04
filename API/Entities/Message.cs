namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }

        public string SenderUsername { get; set; }

        public AppUser sender { get; set; }

        public int RecipientId { get; set; }

        public string recipientUsername { get; set; }

        public AppUser Recipient { get; set; }

        public string Content { get; set; }

        public DateTime? DateRead { get; set; }

        public DateTime MessageSent { get; set; } = DateTime.UtcNow;

        public bool SenderDeleted { get; set; }
        public bool recipientDeleted { get; set; }
    }
}