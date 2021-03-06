﻿using Microsoft.EntityFrameworkCore;
using SixDegrees.Model;

namespace SixDegrees.Data
{
    /// <summary>
    /// Used to access the rate limit cache database.
    /// </summary>
    public class RateLimitDbContext : DbContext
    {
        public RateLimitDbContext(DbContextOptions<RateLimitDbContext> contextOptions)
            : base(contextOptions)
        {
            Database.EnsureCreated();
        }

        public DbSet<UserRateLimitInfo> UserInfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<UserRateLimitInfo>()
                .ToTable("UserInfo")
                .HasKey(info => new { info.UserID, info.Type });
        }
    }
}