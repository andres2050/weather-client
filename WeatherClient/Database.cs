using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using WeatherClient.Configs;
using WeatherClient.Models;

namespace WeatherClient
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Weather> Weathers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new WeathersConfiguration());
            
            modelBuilder.Entity<Weather>()
                .Property(b => b.Created)
                .HasDefaultValueSql("getdate()");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(APIKeys.DatabaseString);
        }
    }
    
    public class WeathersConfiguration : IEntityTypeConfiguration<Weather>
    {
        public void Configure(EntityTypeBuilder<Weather> builder)
        {
            // This Converter will perform the conversion to and from Json to the desired type
            builder.Property(e => e.Response).HasConversion(
                v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
                v => JsonConvert.DeserializeObject<OpenWeatherMap>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }));
        }
    }

    public class Weather
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required]
        public string City { get; set; }
        
        [Required]
        public string Country { get; set; }
        
        [Required]
        public double Temperature { get; set; }

        [Required]
        public OpenWeatherMap Response { get; set; }
        
        [Timestamp]
        public DateTime? Created { get; set; }
        
        [NotMapped]
        public string Message { get; set; }
    }
}