/* 
 * Title Direct Search Services
 *
 * Title Direct Search Services
 *
 * OpenAPI spec version: 4.0.1
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */
using System.IO;
using System.Runtime.Serialization;


namespace Pims.Ltsa.Models
{
    /// <summary>
    /// TitleIdentifier
    /// </summary>
    [DataContract]
    public partial class TitleIdentifier
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TitleIdentifier" /> class.
        /// </summary>
        /// <param name="titleNumber">In practice, the same value as the Application number that raised the Title. (required).</param>
        /// <param name="landTitleDistrict">landLandDistrict.</param>
        public TitleIdentifier(string titleNumber = default, string landTitleDistrict = default)
        {
            // to ensure "titleNumber" is required (not null)
            if (titleNumber == null)
            {
                throw new InvalidDataException("titleNumber is a required property for TitleIdentifier and cannot be null");
            }
            else
            {
                this.TitleNumber = titleNumber;
            }
            this.LandTitleDistrict = landTitleDistrict;
        }

        /// <summary>
        /// In practice, the same value as the Application number that raised the Title.
        /// </summary>
        /// <value>In practice, the same value as the Application number that raised the Title.</value>
        [DataMember(Name = "titleNumber", EmitDefaultValue = false)]
        public string TitleNumber { get; set; }

        /// <summary>
        /// Gets or Sets landTitleDistrict
        /// </summary>
        [DataMember(Name = "landTitleDistrict", EmitDefaultValue = false)]
        public string LandTitleDistrict { get; set; }
    }
}